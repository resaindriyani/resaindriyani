let mediaRecorder;
let audioChunks = [];

const recordBtn = document.getElementById('record');
const stopBtn = document.getElementById('stop');
const playBtn = document.getElementById('play');
const downloadBtn = document.getElementById('download'); // Tombol download
const audioPlayer = document.getElementById('audio');

// Fungsi untuk memulai perekaman suara
recordBtn.onclick = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        audioChunks = [];
        mediaRecorder.ondataavailable = e => {
            audioChunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPlayer.src = audioUrl;
            downloadBtn.href = audioUrl; // Set link download
            downloadBtn.download = 'pesan_suara.wav'; // Nama file saat didownload
        };

        recordBtn.disabled = true;
        stopBtn.disabled = false;
    } catch (err) {
        console.error("Error accessing microphone: ", err);
        alert("Gagal mengakses mikrofon. Pastikan mikrofon sudah diizinkan.");
    }
};

// Fungsi untuk menghentikan perekaman suara
stopBtn.onclick = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
    }
    recordBtn.disabled = false;
    stopBtn.disabled = true;
};

// Fungsi untuk memutar suara yang telah direkam
playBtn.onclick = () => {
    if (audioPlayer.src) {
        audioPlayer.play();
    } else {
        alert("Tidak ada suara yang direkam.");
    }
};
