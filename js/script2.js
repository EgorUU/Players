const videoplayerLine = document.querySelector('.videoplayer-line')
const video = document.createElement('video')
video.setAttribute('width', 566)
video.setAttribute('height', 360)
const play = document.querySelector('.play')
const playImg = document.querySelector('.play>img')
const videoplayerState = document.querySelector('.videoplayer-line-state')
const blockNone = document.querySelector('.block-none')
let countPlay = 0
let videoBool
const videoplayerFile = document.querySelector('#video-file');
const videoplayer = document.querySelector('.videoplayer')
videoplayerLine.style.display = 'none';
videoplayerFile.addEventListener('change', () => {
    console.log('Видео загружено')
    const videoplayer = document.querySelector('.videoplayer')
    videoplayer.prepend(video)
    const v = URL.createObjectURL(videoplayerFile.files[0]);
    blockNone.style.display = 'none';
    video.src = v
    videoplayerLine.style.display = 'block';
});


play.addEventListener('click', () => {
    countPlay++;
    if (countPlay % 2 == 0) {
        playImg.src = './images/videoplayer-play.svg'
        video.pause()
        playImg.style.transform = `translateX(${2}px)`
    }
    else {
        playImg.src = './images/videoplayer-pause.svg'
        playImg.style.transform = `translateX(${0}px)`
        video.play()
        setInterval(() => {
            let w = (video.currentTime / video.duration) * 100
            videoplayerState.style.width = `${w}%`
            if (w >= 100) {
                playImg.src = './images/videoplayer-play.svg'
                video.pause()
                playImg.style.transform = `translateX(${2}px)`
            }
        }, 100)
    }
})



let lineBool
videoplayerLine.addEventListener('mouseover', () => {
    lineBool = true;
    if (lineBool) {
        videoplayerLine.classList.add('videoplayer-line-active');
        play.style.display = 'flex';
    }
})
play.addEventListener('mouseover', () => {
    lineBool = true;
    if (lineBool) {
        videoplayerLine.classList.add('videoplayer-line-active');
        play.style.display = 'flex';
    }
})
video.addEventListener('mouseover', () => {
    lineBool = true;
    videoplayerFile.style.display = 'none'
    if (lineBool) {
        videoplayerLine.classList.add('videoplayer-line-active');
        play.style.display = 'flex';
    }
})
video.addEventListener('mouseleave', () => {
    lineBool = false
    videoplayerLine.classList.remove('videoplayer-line-active');
    play.style.display = 'none';
})

videoplayerLine.addEventListener('mousemove', (e) => {
    if (videoBool) {
        videoplayerState.style.width = `${e.clientX - videoplayerState.getBoundingClientRect().left}px`;
        let videoPercent = ((e.clientX - videoplayerState.getBoundingClientRect().left) / 499) * 100;
        video.currentTime = (videoPercent * video.duration) / 100;
        


    }
})
videoplayerLine.addEventListener('mousedown', () => {
    videoBool = true;
})
videoplayerLine.addEventListener('mouseup', () => {
    videoBool = false;
})
videoplayer.addEventListener('mouseup', () => {
    videoBool = false;
})