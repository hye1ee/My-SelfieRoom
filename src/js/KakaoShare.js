import React, { Component } from 'react';

class Kakao extends Component {
    componentDidMount() {
        if (!window.Kakao.isInitialized()){
            window.Kakao.init('17ae12e356ae408d8cf805c9b9caee87');
        }

        window.Kakao.Link.createDefaultButton({
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
            title: 'MY SELFIE ROOM',
            description: '#share #my #selfie',
            imageUrl: JSON.parse(localStorage.getItem('firebase URL')), //selfie img URL
            link: {
            mobileWebUrl: JSON.parse(localStorage.getItem('firebase URL')),
            webUrl: JSON.parse(localStorage.getItem('firebase URL'))
            }
        },
        social: {
            likeCount: 0,
            commentCount: 0,
            sharedCount: 0
        },
        buttons: [
            {
            title: 'View Photo',
            link: {
                mobileWebUrl: JSON.parse(localStorage.getItem('firebase URL')),
                webUrl: JSON.parse(localStorage.getItem('firebase URL'))
            }
            },
            {
                title: 'Visit Website',
                link: {
                    mobileWebUrl: 'https://myselfieroom-7285b.web.app',
                    webUrl: 'https://myselfieroom-7285b.web.app'
                }
                },
        ]
        });
    }
    onClickKakao = () => {
        window.open('https://sharer.kakao.com/talk/friends/picker/link')
    }
    render() {
        return (
        <div className="Kakao">
            <button id="kakao-link-btn" onClick={this.onClickKakao}><img src={'https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png'} alt="kakao" /></button>
        </div>
        );
    }
}

export default Kakao;