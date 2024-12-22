import AppKit
@preconcurrency import AVFoundation
import CoreImage
import CoreText

func createVideoFromFrames(_ frames: [String], outputURL: URL, frameRate: Float = 30) async throws {
  let width = 1920
  let height = 1080

  // Setup video writer
  let videoWriter = try AVAssetWriter(outputURL: outputURL, fileType: .mov)
  let settings: [String: Any] = [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: width,
    AVVideoHeightKey: height,
  ]

  let writerInput = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
  writerInput.expectsMediaDataInRealTime = false

  let adaptor = AVAssetWriterInputPixelBufferAdaptor(
    assetWriterInput: writerInput,
    sourcePixelBufferAttributes: [
      kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB,
      kCVPixelBufferWidthKey as String: width,
      kCVPixelBufferHeightKey as String: height,
    ]
  )

  videoWriter.add(writerInput)
  videoWriter.startWriting()
  videoWriter.startSession(atSourceTime: .zero)

  // Process frames synchronously
  for (index, frame) in frames.enumerated() {
    while !writerInput.isReadyForMoreMediaData {
      try await Task.sleep(nanoseconds: 10 * NSEC_PER_MSEC)
    }

    // Calculate font size to fit the grid
    let fontWidth = Double(width - 100) / 101.0
    let fontHeight = Double(height - 100) / 103.0
    let fontSize = min(fontWidth, fontHeight)

    // Create CIImage from text
    let attributes: [NSAttributedString.Key: Any] = [
      .font: NSFont.monospacedSystemFont(ofSize: fontSize, weight: .regular),
      .foregroundColor: NSColor.green,
    ]

    let attributedString = NSAttributedString(string: frame, attributes: attributes)

    // Create image context and draw text
    var buffer: CVPixelBuffer?
    let status = CVPixelBufferCreate(kCFAllocatorDefault,
                                     width,
                                     height,
                                     kCVPixelFormatType_32ARGB,
                                     nil,
                                     &buffer)
    if status != kCVReturnSuccess {
      throw NSError(domain: NSOSStatusErrorDomain, code: Int(status))
    }

    // Draw the text into the buffer
    CVPixelBufferLockBaseAddress(buffer!, [])
    let colorSpace = CGColorSpaceCreateDeviceRGB()
    let bitmapContext = CGContext(
      data: CVPixelBufferGetBaseAddress(buffer!),
      width: width,
      height: height,
      bitsPerComponent: 8,
      bytesPerRow: CVPixelBufferGetBytesPerRow(buffer!),
      space: colorSpace,
      bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue
    )!

    bitmapContext.setFillColor(NSColor.black.cgColor)
    bitmapContext.fill(CGRect(x: 0, y: 0, width: width, height: height))

    let rect = CGRect(x: 50, y: 50, width: width - 100, height: height - 100)
    let frameworkString = attributedString as CFAttributedString
    let framesetter = CTFramesetterCreateWithAttributedString(frameworkString)
    let path = CGPath(rect: rect, transform: nil)
    let frame = CTFramesetterCreateFrame(
      framesetter,
      CFRange(location: 0, length: 0),
      path,
      nil
    )
    CTFrameDraw(frame, bitmapContext)

    // Add frame counter text
    let frameText = "Frame: \(index)"
    let frameAttributes: [NSAttributedString.Key: Any] = [
      .font: NSFont.monospacedSystemFont(ofSize: 20, weight: .regular),
      .foregroundColor: NSColor.green,
    ]
    let frameString = NSAttributedString(string: frameText, attributes: frameAttributes)
    let frameRect = CGRect(x: width - 200, y: 50, width: 150, height: 50)
    let frameFrameworkString = frameString as CFAttributedString
    let frameFramesetter = CTFramesetterCreateWithAttributedString(frameFrameworkString)
    let framePath = CGPath(rect: frameRect, transform: nil)
    let frameTextFrame = CTFramesetterCreateFrame(
      frameFramesetter,
      CFRange(location: 0, length: 0),
      framePath,
      nil
    )
    CTFrameDraw(frameTextFrame, bitmapContext)

    CVPixelBufferUnlockBaseAddress(buffer!, [])

    // Add frame to video
    let presentationTime = CMTime(
      value: CMTimeValue(index),
      timescale: CMTimeScale(frameRate)
    )
    adaptor.append(buffer!, withPresentationTime: presentationTime)
  }

  writerInput.markAsFinished()
  await videoWriter.finishWriting()
}
