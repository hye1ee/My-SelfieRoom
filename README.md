# My Selfie Room 🤳📸


### 👯‍♀️ Team Info
 **22S KAIST ID311 Final Project Team6**

20190699 Jongok Hong

20190835 Juwon Oh

20200529 Hyewon Lee 

<br/>

### 📎 Project Info

[![GITHUB](https://img.shields.io/badge/PROJECT-2DAB37?style=for-the-badge&logo=googlecardboard&logoColor=white)](https://my-selfieroom.web.app/)
[![GITHUB](https://img.shields.io/badge/PRESENTATION-BE5FF7?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/proto/XYYF2bGxdPsptXdeC3HWNA/Software-Prototyping?page-id=384%3A51&node-id=384%3A57&viewport=586%2C603%2C0.08&scaling=min-zoom)
[![GITHUB](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hye1ee/KAIST-22S-ID311-Team6.git)
[![GITHUB](https://img.shields.io/badge/Video-FF471F?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/xra1PjiLW2M)
[![GITHUB](https://img.shields.io/badge/Demo-FF9097?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/xra1PjiLW2M)
<br/>

### 🛠️ Project Skills

![GITHUB](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![GITHUB](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)


---



## 🎀 **Concepts**
**Introduction** Nowadays, self photo studios with different styles of frames, backgrounds, and filters are in fashion. We thought it would be fun to make our own online photo booth. 

<img src="./src/assets/md_1.png" alt="drawing" width="30%"/> 
<img src="./src/assets/md_2.png" alt="drawing" width="30%"/> 
<img src="./src/assets/md_3.png" alt="drawing" width="30%"/>

**Design concept** We wanted to make a trendy mood using grayscale & neon color theme. Also, we used grain texture to make a vibe of nostalgic film camera.
<img src="./src/assets/md_4.png"/>

---

## ⌨️ **Implementation**

---

> ### **Flow Design**

**MySelfieRoom** has a below user flow consist of a total 8 steps.
User can choose number of photo **cuts**, **frame** design, **background** design in order and **take** photos with virtual background. After taking photo, user can **select** photos which they want and can apply some **filters**. Finally user can **share** the photo via Kakaotalk or download in local environment.

We chose **React** as the framework for creating a single-page web project. We construct components that correspond to each step, and called them in a series and rendered according to the flow. 

<img src="./src/assets/readme_1.png"/>

During this flow, the object which includes user selections 
`{cuts:num, vertical:bool, frame:num, background:num, images:Array(ImageDta), select:Array(num), dataurl:dataURL}` is passing by  props. The key-value pairs are accumlated to this object as it passes through each component.


This project was implemented to be a good design from the following properties.
- **Learnability**
    1. Cursor hover animation for all clickable components
- **Efficiency**
    1. Take process initiate and terminate automatically without additional action
    2. User can re-order the photo selections
- **Safety**
    1. User cannot move to nextstep without any selection
    2. On the take stage, timer will be started after API respond arrived



---

<br/>

>### **Function Design**
This project are using 4 libraries, 2 APIs with firebase database and storage.

[![GITHUB](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/docs?hl=ko)
[![GITHUB](https://img.shields.io/badge/React.webcam-FF9097?style=for-the-badge&logo=airplayvideo&logoColor=white)](https://www.npmjs.com/package/react-webcam)
[![GITHUB](https://img.shields.io/badge/Dom.to.Image-ff9246?style=for-the-badge&logo=slickpic&logoColor=white)](https://github.com/tsayen/dom-to-image)
[![GITHUB](https://img.shields.io/badge/File.Saver-727272?style=for-the-badge&logo=onlyoffice&logoColor=white)](https://www.npmjs.com/package/file-saver)
[![GITHUB](https://img.shields.io/badge/Caman.JS-2986CC?style=for-the-badge&logo=rootsbedrock&logoColor=white)](http://camanjs.com/)
[![GITHUB](https://img.shields.io/badge/Mediapipe-29CAA9?style=for-the-badge&logo=codacy&logoColor=white)](https://google.github.io/mediapipe/)
[![GITHUB](https://img.shields.io/badge/kakao-FFCD00?style=for-the-badge&logo=kakao&logoColor=white)](https://developers.kakao.com/docs/latest/ko/message/common#kakaolink)

<img src="./src/assets/readme_2.png"/>

Each of above libraries and APIs wanted different image type such as **Canvas element, ImageData, DataURL, image file(png or jpeg)**. This project is constructed to dealing with various types of image with following process.


<img src="./src/assets/readme_3.png"/>

`Step1`
First camera data from react-webcam library is send to MediaPipe machine learning model.
`Step2`
Then, it return detected (background)area that can be used in HTML canvas element.
`Step3`
With this data, draw camera data only on the detected area and draw background that user selected on the rest area on Canvas element.Then it will be look like that the virtual background is applied to image. This step is exectued 60 times per 1 second just like p5.js canvas drawing while the camera is ON state.

`Step4`
Taking photo is proceed by extracting ImageData of Canvas at certain points.
After user makes selection, draw selected photo with ImageData on canvas which is stored in the previous step.

`Step5`
Then, Caman js library applies filter on that canvas.

`Step6`
On the final stage dom-to-image library converts our Canvas to DataURL.


<img src="./src/assets/readme_4.png"/>

`Step7`
With this DataURL, first png file is generated by file-saver library and store it to user’s local environment.

`Step8`
Second it is send to firebase storage and firebase saves this DataURL as png file.

`Step9`
Lastly png url which is on the firebase storage is send to Kakao API then user can share this photo to our friends.


---
<br/>

## 👊 **Chanllenges**

1. **Find appropriate Libraries/APIs and Connect**

    : The most tricky part was to make an order of library used to match input-output types. (Solution is already mentioned)
2. **API request latency**

    : There was some latency with getting request respond, so used states as flag and observe flag changes to resume next step

3. **Firebase network problem NET::_ERR_[?]**

    : There was unidentified network error with firebase storage. It was solved through the following attempts, and the biggest cause was unstable connection.
    - Delete browser cache
    - Reconnect to stable wifi
    - Change a firebase storage location to asia-northeast3(Seoul)
