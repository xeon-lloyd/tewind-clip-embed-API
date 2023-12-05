class TewindClipEmbed{
    constructor(clipId){
        if(clipId == undefined){
            console.error(`TewindClipEmbed:클립 아이디 누락 - 객체 생성시 clipId 매개변수는 필수입니다`)
            return;
        }

        this.primaryId = `${clipId}:${Math.random()}`;

        this.iframeElement.src = `https://tewind.kr/clip/embed/${clipId}#${this.primaryId}`;
        this.iframeElement.title = "Tewind video player";
        this.iframeElement.style = "width: 100%; aspect-ratio: 16/9";
        this.iframeElement.frameborder = "0";
        this.iframeElement.allow = "accelerometer; autoplay; gyroscope; picture-in-picture; web-share"
        this.iframeElement.allowfullscreen="";          

        window.addEventListener('message', (e)=>{
            if(e.data.primaryId!=this.primaryId) return;

            switch(e.data.event){
                case 'playReady':
                    this.currentTime = 0;
                    this.duration = e.data.duration;
                    this.onPlayReady();
                    break;
                
                case 'timeupdate':
                    this.currentTime = e.data.currentTime;
                    this.onTimeupdate();
                    break;

                case 'end':
                    this.onEnd();
                    break;
            }
            
        });
    }

    primaryId = '';

    iframeElement = document.createElement('iframe');
    currentTime = null;
    duration = null;

    onPlayReady = function(){}
    onTimeupdate = function(){}
    onEnd = function(){}

    play = function(){
        this.iframeElement.contentWindow.postMessage({
            command: 'play'
        }, '*');
    }

    pause = function(){
        this.iframeElement.contentWindow.postMessage({
            command: 'pause'
        }, '*');
    }

    seekTo = function(sec){
        sec = Number(sec)
        if(isNaN(sec)){
            console.error(`TewindClipEmbed:매개변수 유효성 오류 - sec는 숫자 형식이여야 합니다`)
            return;
        }

        this.iframeElement.contentWindow.postMessage({
            command: 'seekTo',
            sec
        }, '*');
    }

    setVolume = function(vol){
        vol = Number(vol)
        if(isNaN(vol)){
            console.error(`TewindClipEmbed:매개변수 유효성 오류 - vol은 숫자 형식이여야 합니다`)
            return;
        }

        this.iframeElement.contentWindow.postMessage({
            command: 'setVolume',
            vol
        }, '*');
    }
}