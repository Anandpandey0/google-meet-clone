import { RTCPeerConnection } from 'node-webrtc';

export async function makeCall(signalingChannel) {
  const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
  const peerConnection = new RTCPeerConnection(configuration);

  signalingChannel.addEventListener('message', async (event) => {
    const message = JSON.parse(event.data);
    if (message.answer) {
      const remoteDesc = new RTCSessionDescription(message.answer);
      await peerConnection.setRemoteDescription(remoteDesc);
    }
  });

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  const offerData = JSON.stringify({ offer });

  signalingChannel.send(offerData);
}
