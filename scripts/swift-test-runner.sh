#!/bin/bash

cd swift
swift test --filter "$1" --parallel --disable-swift-testing --quiet -c release
cd ..
