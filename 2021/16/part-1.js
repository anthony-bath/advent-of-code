import { bitsByHex } from './common.js';

export function part1({ data: fullPacket }) {
  const versions = [];

  class Packet {
    constructor(data) {
      this.data = data;
      this.version = this.getNextBits(3);
      versions.push(this.version);
      this.typeId = this.getNextBits(3);

      if (this.typeId === 4) {
        this.value = this.getLiteralValue();
        return;
      }

      this.lengthTypeId = this.getNextBits(1);
      this.subPackets = [];

      if (this.lengthTypeId === 0) {
        this.subPackets = this.getSubPacketsByLength();
      } else {
        this.subPackets = this.getSubPacketsByCount();
      }
    }

    getLiteralValue() {
      let bits = '';
      let more = true;

      while (more) {
        more = this.getNextBits(1) === 1;
        bits += this.getBitString(4);
      }

      return parseInt(bits, 2);
    }

    getSubPacketsByLength() {
      const packets = [];
      const length = this.getNextBits(15);
      let packetBits = this.data.slice(0, length);
      this.data = this.data.slice(length);

      while (packetBits) {
        const packet = new Packet(packetBits);
        packets.push(packet);
        packetBits = packet.data;
      }

      return packets;
    }

    getSubPacketsByCount() {
      const packets = [];
      const count = this.getNextBits(11);

      while (packets.length < count) {
        const packet = new Packet(this.data);
        packets.push(packet);
        this.data = packet.data;
      }

      return packets;
    }

    getNextBits(length) {
      return parseInt(this.getBitString(length), 2);
    }

    getBitString(length) {
      const string = this.data.slice(0, length);
      this.data = this.data.slice(length);
      return string;
    }
  }

  const unpacked = [...fullPacket].map((c) => bitsByHex.get(c)).join('');

  new Packet(unpacked);

  return versions.reduce((sum, version) => (sum += version));
}
