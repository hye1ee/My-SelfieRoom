
class Kakao {
    componentDidMount() { //* to solve sdk error
        this.ready = false;
        if (!window.Kakao.isInitialized()){
            window.Kakao.init('17ae12e356ae408d8cf805c9b9caee87');
        }
    }

    constructor() {
        console.log(window.Kakao);
        if (!window.Kakao.isInitialized()){
            window.Kakao.init('17ae12e356ae408d8cf805c9b9caee87');
        }
        this.ready = false;
    }
    createButton(){
        this.ready = true;
        console.log("kakao", localStorage.getItem('url'));

        if (!window.Kakao.isInitialized()){
            window.Kakao.init('17ae12e356ae408d8cf805c9b9caee87');
        }
        window.Kakao.Link.createDefaultButton({

            container: '#kakao-link-btn',
            objectType: 'feed',
            content: {
                title: 'MY SELFIE ROOM',
                description: '#share #my #selfie',
                imageUrl: localStorage.getItem('url'),
                link: {
                mobileWebUrl: 'https://myselfieroom-7285b.web.app',
                webUrl: 'https://myselfieroom-7285b.web.app'
                }
            },
            social: {
                likeCount: 0,
                commentCount: 0,
                sharedCount: 0
            },
            buttons: [
                {
                  title: 'Visit Website',
                  link: {
                      mobileWebUrl: 'https://myselfieroom-7285b.web.app',
                      webUrl: 'https://myselfieroom-7285b.web.app'
                  }
                },
                {
                  title: 'view photo',
                  link: {
                      mobileWebUrl: localStorage.getItem('url'),
                      webUrl: localStorage.getItem('url')
                  }
                },
           ]
        });
    }
    

}

export default Kakao;