// Original synthesized web-shooter effect. No movie audio recordings are used.
const noiseBuffers = new WeakMap();
function noise(ctx) {
  if (noiseBuffers.has(ctx)) return noiseBuffers.get(ctx);
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 0.4), ctx.sampleRate);
  const samples = buffer.getChannelData(0);
  let seed = 7319;
  for (let i = 0; i < samples.length; i++) {
    seed = (seed * 16807) % 2147483647;
    samples[i] = (seed / 2147483647) * 2 - 1;
  }
  noiseBuffers.set(ctx, buffer);
  return buffer;
}
export function renderWebShot(ctx, capture = false, destination = ctx.destination) {
  const start = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.value = 0.24;
  master.connect(destination);
  const hiss = ctx.createBufferSource();
  hiss.buffer = noise(ctx);
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.value = 1.1;
  filter.frequency.setValueAtTime(1800, start);
  filter.frequency.exponentialRampToValueAtTime(6500, start + 0.025);
  filter.frequency.exponentialRampToValueAtTime(750, start + 0.23);
  const envelope = ctx.createGain();
  envelope.gain.setValueAtTime(0.001, start);
  envelope.gain.exponentialRampToValueAtTime(0.8, start + 0.008);
  envelope.gain.exponentialRampToValueAtTime(0.35, start + 0.045);
  envelope.gain.exponentialRampToValueAtTime(0.001, start + 0.25);
  hiss.connect(filter);
  filter.connect(envelope);
  envelope.connect(master);
  hiss.start(start);
  hiss.stop(start + 0.27);
  const snap = ctx.createOscillator(),
    snapGain = ctx.createGain();
  snap.type = 'triangle';
  snap.frequency.setValueAtTime(1800, start);
  snap.frequency.exponentialRampToValueAtTime(110, start + 0.07);
  snapGain.gain.setValueAtTime(0.27, start);
  snapGain.gain.exponentialRampToValueAtTime(0.001, start + 0.085);
  snap.connect(snapGain);
  snapGain.connect(master);
  snap.start(start);
  snap.stop(start + 0.09);
  const whip = ctx.createOscillator(),
    whipGain = ctx.createGain();
  whip.type = 'sine';
  whip.frequency.setValueAtTime(420, start + 0.015);
  whip.frequency.exponentialRampToValueAtTime(1250, start + 0.045);
  whip.frequency.exponentialRampToValueAtTime(170, start + 0.16);
  whipGain.gain.setValueAtTime(0.001, start);
  whipGain.gain.exponentialRampToValueAtTime(0.13, start + 0.025);
  whipGain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);
  whip.connect(whipGain);
  whipGain.connect(master);
  whip.start(start);
  whip.stop(start + 0.19);
  if (capture) {
    const impact = ctx.createBufferSource(),
      lowpass = ctx.createBiquadFilter(),
      hitGain = ctx.createGain();
    impact.buffer = noise(ctx);
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 1400;
    hitGain.gain.setValueAtTime(0.3, start + 0.11);
    hitGain.gain.exponentialRampToValueAtTime(0.001, start + 0.24);
    impact.connect(lowpass);
    lowpass.connect(hitGain);
    hitGain.connect(master);
    impact.start(start + 0.11);
    impact.stop(start + 0.26);
  }
  hiss.onended = () => master.disconnect();
}
const buses = new WeakMap();
export function playWebShot(ctx, capture) {
  let bus = buses.get(ctx);
  if (!bus) {
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 12;
    compressor.ratio.value = 8;
    compressor.attack.value = 0.002;
    compressor.release.value = 0.12;
    compressor.connect(ctx.destination);
    bus = { compressor, last: -1 };
    buses.set(ctx, bus);
  }
  if (ctx.currentTime - bus.last < 0.035) return;
  bus.last = ctx.currentTime;
  renderWebShot(ctx, capture, bus.compressor);
}
