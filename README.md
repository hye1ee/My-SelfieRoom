# My Selfie Room 🤳

This is the redesigned and refactored project ([original repository](https://github.com/hye1ee/KAIST-22S-ID311-Team6))

### DEMO IS HERE!! 📸

[Visit our demo](https://my-selfie-room.vercel.app/) and feel free to put feedback as github issues.

### COMMING SOON 🎀

- [ ] Filter applied photo download
- [ ] Mobile compatibility

## <br />

### My Selfie Room

is a web-based online photobooth where you can take y2k aesthetic photos. It provides 3 polaroid styles of frame with different fonts. You can take photo on 5 different virtual backgrounds by Mediapipe machine learnign APIs.

<img src="./src/assets/readme-main.png" alt="drawing" width="70%"/> 
<img src="./src/assets/readme-frame.png" alt="drawing" width="70%"/> 
<img src="./src/assets/readme-background.png" alt="drawing" width="70%"/> 

---

### Implementation

![GITHUB](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![GITHUB](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![GITHUB](https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white)
[![GITHUB](https://img.shields.io/badge/Mediapipe-29CAA9?style=for-the-badge&logo=codacy&logoColor=white)](https://google.github.io/mediapipe/)

The origin project was designed based on pure React. During consequetive 8 steps of user flow, its states were reiteratively got across child components.

> **MySelfieRoom** has a below user flow consisting of a total of 8 steps. Users can choose a number of photo **cuts**, **frame** design, **background** design in order and **take** photos with virtual background. After taking photos, users can **select** photos that they want and apply some **filters**. Finally user can **share** the photo via download in the local environment. (**Currently photo without filters is only downloadable**)

In this project, all states are managing via **Recoil** state and implemented with **Typescript** for scalability.
Additional features such as decorating will be released soon!
