# iframe 삽입에 대한 Tewind Clip Player API

IFrame Player API를 통해 웹사이트에 티와인드 클립 플레이어를 퍼가고 JavaScript를 사용하여 플레이어를 제어할 수 있습니다.<br>

API의 Javascript 함수를 사용하여 동영상을 재생, 일시중지하거나, 플레이어 볼륨을 조정하거나, 영상 상태 변경에 따른 이벤트 함수 설정, 재생 중인 동영상에 대한 정보를 가져올 수 있습니다.<br>


## 시작하기

```html
<!-- 1. TewindClipEmbed API 임포트 -->
<script src="TewindClipEmbed.js"></script>

<!-- 혹은 tewind CDN 사용 -->
<!-- <script src="https://tewind.kr/js/clip/TewindClipEmbed.js"></script> -->


<!-- 2. 플레이어가 임베드되는 영역 (이후 .appendChild 를 통해서 #embedArea 내부에 iframe 삽입) -->
<div id="embedArea" style="width: 800px;"></div>


<script>
    // 3. API 사용을 위해 TewindClipEmbed 객체를 clip-id 매개변수를 이용해 생성
    let clip = new TewindClipEmbed("clip-id");
    
    // 4. #embedArea에 iframe 삽입 (.iframeElemet 속성 이용)
    document.getElementById('embedArea').appendChild(clip.iframeElement)
</script>
```
위 과정을 통해서 웹 페이지에 간단하게 티와인드 클립 플레이어를 임베드 할 수 있습니다.<br>
<br>

```html
 ...
<script>
    let clip1 = new TewindClipEmbed("clip1-id");
    document.getElementById('embedArea').appendChild(clip1.iframeElement)

    let clip2 = new TewindClipEmbed("clip2-id");
    document.getElementById('embedArea').appendChild(clip2.iframeElement)

    let clip2_2 = new TewindClipEmbed("clip2-id");
    document.getElementById('embedArea').appendChild(clip2_2.iframeElement)
</script>
```
위와 같이 한 페이지에 여러개의 플레이어를 임베드 할 수 있습니다.<br>
<br>


## 플레이어 제어하기
웹 페이지에 임베드 한 플레이어를 아래 코드를 통해 제어할 수 있습니다.<br>
```javascript
// 티와인드 클립 플레이어 임베드
let clip = new TewindClipEmbed("clip-id");
document.getElementById('embedArea').appendChild(clip.iframeElement)

// 클립 재생
clip.play()

// 클립 일시정지
clip.pause()

// 재생 지점 설정
clip.seekTo(10) // 10초 지점으로 이동

// 볼륨 설정
clip.setVolume(0.3) // 볼륨을 30%로 설정
```
<br>

## 플레이어 정보 얻기
웹 페이지에 임베드 한 플레이어의 재생 관련 정보를 아래 코드를 통해 조회할 수 있습니다.<br>
```javascript
// 티와인드 클립 플레이어 임베드
let clip = new TewindClipEmbed("clip-id");
document.getElementById('embedArea').appendChild(clip.iframeElement)

// 현재 재생 시각(초) 조회
let curTime = clip.currentTime

// 전체 길이 조회
let fullLen = clip.duration
```
위 두 속성은 읽기전용으로 별도의 값을 대입해도 별다른 기능은 없습니다.<br>
<br>
재생 관련 정보는 영상이 로드된 후(재생 준비 완료 상태) 조회가 가능하며 이전 기본값은 `null` 입니다
<br>
<br>

## 플레이어에 이벤트 설정하기
웹 페이지에 임베드 한 플레이어의 상태 변경에 따른 함수 호출을 지정할 수 있습니다.(이벤트)<br>
```javascript
// 티와인드 클립 플레이어 임베드
let clip = new TewindClipEmbed("clip-id");
document.getElementById('embedArea').appendChild(clip.iframeElement)

// 재생 가능 상태가 되었을때 실행
clip.onPlayReady = function(){
    alert("클립을 재생할 수 있음")
}

// 재생 시각이 업데이트 되면 실행
clip.onTimeupdate = function(){
    console.log(clip.currentTime) // 현재 재생시각 콘솔 출력
}

// 재생이 종료되면 실행
clip.onEnd = function(){
    alert("클립 종료됨!")
}
```
각각의 요소들은 함수 `function(){}` 타입이여야 합니다.<br>
<br>

## API 이용 주의사항
API를 이용하면서 티와인드의 서비스 운영에 부정적인 영향을 미치거나 저해하는 방식으로 사용시,<br>
보안 취약점을 사용하여 티와인드의 의도와 다르게 사용할 경우 API 사용에 제한이 생길 수 있습니다.<br>
<br>
사용 범위에 대해서 궁금한 점이 있거나, 각종 오류 신고 및 기능 건의는 `support@tewind.kr`로 문의주시기 바랍니다