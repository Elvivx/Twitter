const head = document.querySelector('#header-m')
const nav = document.querySelector('.nav-mobile')
const mobileTweet = document.querySelector('.mobile-tweet')
const load = document.querySelector('.load')
window.addEventListener('DOMContentLoaded', function() {
  // Hide loading animation and show the header when the DOM is ready, after a delay of 1 second to avoid flashing on load
  setTimeout(removeload,7000)
  function removeload(){
    // load.style = "opacity: 0; "
    load.classList.add("hide-load")
    load.style = "transform: scale(3090);"
    // load.style.display = "none"
    setTimeout(()=>{load.style.display = "none"}, 2000)

  }

  renderTweets(tweetData)
  renderAsideTrends(trendData , `.trend-container`)
  renderToFollow(toFollowData , `.follow-container`)
  messages(messageData)
});

// scroll function for header and navigation bar
let lastScrollTop = 0;
window.addEventListener("scroll", ()=> {
  let scrollTop = window.scrollY
  if (scrollTop > lastScrollTop) {
    // User is scrolling down
    head.classList.add('scrollHead')
    nav.classList.add('scrollNav')
    

  } else {
    // User is scrolling up
    head.classList.remove('scrollHead')
    nav.classList.remove('scrollNav')
    
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

  let toTop = window.scrollY
  let headHeight = head.getBoundingClientRect().height
  if(toTop > headHeight){
    head.style = `position: fixed;`
  }
  else{
    head.style = 'position: static'
  }
});
//end 

//for you & following button active state
const feedBtn = document.querySelectorAll('.feedBtn')
feedBtn.forEach((btns)=>{ 
  btns.addEventListener( "click" ,(e)=>{
  let active = document.querySelectorAll('.feedBtn .btn div')
  active[0].classList.remove('active')
  active[1].classList.remove('active')
  e.currentTarget.children[0].children[1].classList.add('active')
  console.log(active)
  })
})
//end




//create tweet function for posting
const postBtn = document.querySelector('.post-btn')
const inputValues = document.querySelector('.post .input')
postBtn.onclick = ()=>{
  createPostTweet(inputValues)
  postBtn.setAttribute("disabled", true)
  postBtn.classList.remove('enable-post-btn')
}
inputValues.addEventListener( 'input',()=>{
  const see = document.querySelector(".sees")
  const whoSees = document.querySelector(".who-sees")
  const hr = document.querySelector('.hr')
  if(inputValues.value == ""){
    postBtn.classList.remove('enable-post-btn')
    postBtn.setAttribute( "disabled" , true)
    see.style =  `display : none`
    whoSees.style = `display : none`
    hr.style = `display : none`
  }else{
    postBtn.classList.add('enable-post-btn')
    postBtn.removeAttribute('disabled')
    see.style =  `display : block`
    whoSees.style = `display : block`
    hr.style = `display : block`
  }
});
inputValues.addEventListener('focusin',()=>{
  inputValues.addEventListener('keydown', function(e){
    if((e.key=='Enter'||e.keyCode == 13) ){
      if(postBtn.hasAttribute( "disabled")){
        return false
      }else{
        e.preventDefault();
        createPostTweet(inputValues)
        postBtn.setAttribute("disabled", true)
        postBtn.classList.remove('enable-post-btn')
      }
    }
  })  
})

function createPostTweet(input){
  const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
  ]
  // const weekdays = [
  //     'sun',
  //     'mon',
  //     'tue',
  //     'wed',
  //     'thru',
  //     'fri',
  //     'sat',
  // ]
  let posteddate = new Date()
  const  month = months[posteddate.getMonth()]
  // const day = weekdays[posteddate.getDay()]
  const date = posteddate.getDate()
  // const timeStamp = document.querySelector('.timestamp')
  const newdate =  date +' '+ month
  // timeStamp.textContent = 
  
    // console.log(timeStamp)
  console.log(date,  month)

  const id = new Date().getTime().toString()


  // interaction btn values
  // likeCount = 0
  // retweetCount = 0
  // commentCount = 0

  // creating  elements of the tweet
  let textValue = input.value
  const  tweetFeed = document.querySelector('.main-feed')
  const TweeT = document.createElement( 'div' )
  TweeT.setAttribute('data-id', id)
  TweeT.classList.add('tweet')
  TweeT.innerHTML = `
  <div class="tweetInfo">
      <div class="profilePic">
          <img src="Images/profile pics/20240310_144314.jpg" alt="elvivx-profile-picture">
      </div>

      <div class="tweetContainer">
          <div class="info">
              <span class="name">Elvivx</span>
              <span class="verified">
                  <i class="fa-solid fa-circle-check"></i>
              </span>
              <span class="username">@elvivx</span>
              <span class="dot">·</span>
              <span class="timeStamp">${newdate}</span>
              <span class="option">
                  <i class="fa-solid fa-ellipsis"></i>
              </span>
              <div class="option-table">
                <div class="options del">
                    <div class="icon">
                        <i class="fa-regular fa-face-meh-blank"></i>
                    </div>
                    <div class="text">
                        <span>DeleteTweet</span>
                    </div>
                </div>
                <div class="options">
                    <div class="icon">
                        <i class="fa-regular fa-face-meh-blank"></i>
                    </div>
                    <div class="text">
                        <span>Add/remove from @elvivx from lists</span>
                    </div>
                </div>
              </div>
          </div>

          <div class="content">
              <p class="text">
                  ${textValue}
              </p>
              <!-- <img src="Images/wallpaperflare.com_wallpaper (9).jpg" alt=""> -->

              <div class="tweetBtns">
                  <div class="interactionBtns">
                      <span class="btn comment">
                          <i class="fa-regular fa-comment"></i>
                          <span>0</span>
                      </span>

                      <span class="btn retweet">
                          <i class="fa-solid fa-retweet"></i>
                          <span>0</span>
                      </span>

                      <span class="btn like">
                          <i class="fa-regular fa-heart"></i>
                          <span>0</span>
                      </span>

                      <span class="btn chart">
                          <i class="fa-solid fa-chart-simple"></i>
                          <span>1</span>
                      </span>


                      <div class="trafficShareBtns">
                        <span class="bookmark">
                            <i class="fa-regular fa-bookmark"></i>
                        </span>

                        <span class="share">
                            <i class="fa-solid fa-arrow-up-from-bracket"></i>
                        </span>


                      </div>

                  </div>
              </div>
              </div>
              </div>
              </div>
  `
  // Event listeners for interaction button
  const interactionBtns = TweeT.querySelectorAll('.interactionBtns .btn')
  
  interactionBtns.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
      let pressedBtn = e.currentTarget
      let condition = pressedBtn.classList.contains('like') || pressedBtn.classList.contains('comment')

      if(condition){
        pressedBtn.children[0].classList.toggle('fa-solid')
      }
      // change colors of btns
      if(pressedBtn.classList.contains('like')){
        pressedBtn.classList.toggle('liked')
        likeCount = 0
        if(pressedBtn.classList.contains('liked')){
          // likeCount++
          pressedBtn.childNodes[3].textContent = 1
        }else{
          // likeCount--
          pressedBtn.childNodes[3].textContent = 0
        }
      }
      if(pressedBtn.classList.contains('comment')){
          pressedBtn.classList.toggle('commented')
          // commentCount = 0
          if(pressedBtn.classList.contains('commented')){
            // commentCount++
            pressedBtn.childNodes[3].textContent = 1
        }else{
          // commentCount--
          pressedBtn.childNodes[3].textContent = 0
        }
      }
      if(pressedBtn.classList.contains('retweet')){
        pressedBtn.classList.toggle('retweeted')
        retweetCount = 0
        if(pressedBtn.classList.contains('retweeted')){
          // retweetCount++
          pressedBtn.childNodes[3].textContent = 1
        }else{
          // retweetCount--
          pressedBtn.childNodes[3].textContent = 0
        }
      }
      
    })
  })

  //bookmark button event
  const bookmark = TweeT.querySelector('.bookmark')
  const bookmarked = document.querySelector('.bookmarked')
  bookmark.addEventListener('click',()=>{
    let book = bookmark.childNodes[1].classList
    if(!book.contains('fa-solid')){
      book.add('fa-solid')
      bookmark.style = `color: rgb(10, 156, 240);`
      bookmarked.style = `transform: translateY(1%);`
      bookmarked.childNodes[3].textContent = 'Added to bookmarks'
      setTimeout(() => {
        bookmarked.style='transform: translateY(-100%);'
      }, 1000);
    }else if(book.contains('fa-solid')){
      book.remove('fa-solid')
      bookmark.style = `color: grey;`
      bookmarked.style = `transform: translateY(1%);`
      bookmarked.childNodes[3].textContent = 'Removed from bookmarks'
      setTimeout(() => {
        bookmarked.style='transform: translateY(-100%);'
      }, 1000);
    }
  })

  //Tweets Options button event
  const tweetOptions = TweeT.querySelector('.tweetContainer .option')
  tweetOptions.addEventListener("click", ()=>{
    tweetOptions.parentElement.children[6].classList.toggle('show-option-table')
  })
    //escape button function event
  window.addEventListener('keydown', function(e){
      if((e.key=='Escape'||e.key=='Esc'||e.keyCode==27) ){
        tweetOptions.parentElement.children[6].classList.remove('show-option-table')
      // this.alert('works')
      }
  })
  //delete tweet
  const DeleteTweet = TweeT.querySelector('.del')
  DeleteTweet.addEventListener('click', (e)=>{
    const item = e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement
    tweetFeed.removeChild(item)
  })
  input.value = ""
  // append to feeds
  return tweetFeed.appendChild(TweeT)
    
}

// Modal post functions
const navPostBtn = document.querySelector('.nav .post')
const closeModal = document.querySelector('.post-modal .top i')
const postModal = document.querySelector('.post-modal')
navPostBtn.onclick = () => {
  postModal.style.display = "block";
}
 //tweet button
mobileTweet.addEventListener('click',()=>{
  postModal.style.display = "block";
})
//end
closeModal.onclick = () => {
  postModal.style.display = "none"
}

const modalPostBtn = document.querySelector('.post-modal .post-btn')
const modalInput = document.querySelector('.post-modal .modal-input')
modalPostBtn.onclick = () => {
  createPostTweet(modalInput)
  postModal.style.display = "none"
  modalPostBtn.setAttribute("disabled", true)
  modalPostBtn.classList.remove('enable-modal-post')
}

// modal input events
modalInput.addEventListener( 'input',()=>{
  if(modalInput.value == ""){
    modalPostBtn.classList.remove('enable-modal-post')
    modalPostBtn.setAttribute( "disabled" , true)
  }else{
    modalPostBtn.classList.add('enable-modal-post')
    modalPostBtn.removeAttribute('disabled')
  }
})
modalInput.addEventListener('focusin',()=>{
  modalInput.addEventListener('keydown', function(e){
    if((e.key=='Enter'||e.keyCode == 13) ){
      if(modalPostBtn.hasAttribute( "disabled")){
        return false
      }else {
        e.preventDefault()
        postModal.style.display = "none"
        createPostTweet(modalInput)
        modalPostBtn.setAttribute("disabled", true)
        modalPostBtn.classList.remove('enable-modal-post')
        console.log("WIN")
      }
    }
  })  
})





//Data for tweets, trends and toFollow sections
tweetData = [
  {
    name:  'CID',
    username: "theonecid",
    profileImg:'Images/profile pics/20240107_114917.jpg',
    verified: 'fa-solid fa-circle-check',
    date: new Date().getDay() + " Feb",
    img: 'Images/20240311_120501.jpg',
    tweet:"Nothing Phone 2 Vs Galaxy S24 front-design🔥 <br/><br/>Look at those bezels <br/>Samsung simply killed it🤯🤯" ,
    likes: Math.floor(Math.random()*132),
    comments: Math.floor(Math.random()*131),
    retweets: Math.floor(Math.random()*134),
    chart: Math.floor(Math.random()*234),
    tags:''
  },
  {
    name:  'Invis',
    username: "invis4yo",
    profileImg:'Images/profile pics/20240107_114844.jpg',
    verified: 'fa-solid fa-circle-check',
    date: new Date().getDate() + " Feb",
    tweet:"No one <br/><br/>8 year old me:",
    img: 'Images/20240311_120535.jpg',
    likes: Math.floor(Math.random()*132),
    comments: Math.floor(Math.random()*131),
    retweets: Math.floor(Math.random()*134),
    chart: Math.floor(Math.random()*234),
    tags:''
  },
  {
    name:  "fun cats",
    username: "catshouldn't",
    profileImg:'Images/profile pics/20231231_124613.jpg',
    verified: 'fa-solid fa-circle-check',
    date: new Date().getDay() + " Feb",
    tweet:"",
    img: 'Images/20240311_120552.jpg',
    likes: Math.floor(Math.random()*132),
    comments: Math.floor(Math.random()*131),
    retweets: Math.floor(Math.random()*134),
    chart: Math.floor(Math.random()*234),
    tags:''
  },
   {
    name:  'funny memes',
    username: "funmemes",
    profileImg:'Images/profile pics/20231122_172158.jpg',
    verified: 'fa-solid fa-circle-check',
    date: new Date().getDay() + " Feb",
    tweet:"I'm loving this #JavaScript course! It's really helping me understand the language.",
    img: 'Images/20240311_120543.jpg',
    likes: Math.floor(Math.random()*132),
    comments: Math.floor(Math.random()*131),
    retweets: Math.floor(Math.random()*134),
    chart: Math.floor(Math.random()*234),
    tags:''
  },
  {
    name:  'Dev meme',
    username: "devsmeme",
    profileImg:'Images/profile pics/20240121_143633.jpg',
    verified: 'fa-solid fa-circle-check',
    date: new Date().getDate() + " Feb",
    tweet:"Difference between the two....",
    img: 'Images/20240311_120446.jpg',
    likes: Math.floor(Math.random()*132),
    comments: Math.floor(Math.random()*131),
    retweets: Math.floor(Math.random()*134),
    chart: Math.floor(Math.random()*234),
    tags:'#javascript #coding #webdev'
  }
]
trendData = [
  {
    category:'Enginerring',
    topic: 'Lamborghini',
    postCount: '2,869'
  },
  {
    category:'Business & Finance',
    topic: 'Dollar to naira',
    postCount: '4,869'
  },
  {
    category:'politics',
    topic: 'Peter Obi',
    postCount: '23k'
  },
  {
    category:'Entertainment',
    topic: 'Will Smith',
    postCount: '44.2k'
  },
  {
    category:'Entertainment',
    topic: 'John Cena',
    postCount: '23k'
  },
  {
    category:'',
    topic: 'Calvinism',
    postCount: '2,434'
  },
  {
    category:'Game of Thrones',
    topic: 'Game of Thrones',
    postCount: '4,399'
  },
  {
    category:'Business & Finance',
    topic: 'Dollar to naira',
    postCount: '4,869'
  },
  {
    category:'',
    topic: 'Elon',
    postCount: '126k'
  },
  {
    category:'',
    topic: 'Jesus Christ',
    postCount: '894.2k'
  },
  {
    category:'Food',
    topic: 'Egusi',
    postCount: '2,369'
  },
  {
    category:'Entertainment',
    topic: 'Kakashi',
    postCount: '3,749'
  },
  {
    category:'Business & Finance',
    topic: 'Binance',
    postCount: '19.46k'
  },
  {
    category:'Politics',
    topic: 'Islam',
    postCount: '213.7k'
  },
  {
    category:'',
    topic: '#becometelecel',
    postCount: '1,534'
  },
  {
    category:'Music',
    topic: 'Emeka',
    postCount: '7,819'
  }
]
toFollowData = [
  {
    userImg: "Images/profile pics/20240107_114917.jpg",
    user: "Linzxx",
    username: "linsxx",
    bio: "Exploring Africa’s tech space + Sharing my discoveries | Founded @uruggohq | Tech Entrepreneur | Django & Sveltekit | STEEZE JESU ☘️"
  },
  {
    userImg: "Images/profile pics/20240121_143633.jpg",
    user: "Centurion1307",
    username: "centurion1307",
    bio: "Cast member of @txr_podcast Gaming Entertainment Enthusiast. Keeper of The Gaming FanBoy."
  },
  {
    userImg: "Images/profile pics/20231122_172158.jpg",
    user: "GigaBasedDad",
    username: "GigaBasedDad",
    bio: "Unapologetically Christian and Based. Husband and Father. Pro: God, Family, Freedom, Homesteading, Scripture, Memes, Homeschooling, Hunting, Community."
  },
  {
    userImg: "Images/profile pics/20231231_124613.jpg",
    user: "ShitpostGate",
    username: "ShitpostGate",
    bio: "Love Shitposting and posting whatever I want/mostly memes/some personal stuff I like. I just like screwing around. Love old school stuff including weapons."
  },
  {
    userImg: "Images/profile pics/20240121_143633.jpg",
    user: "Science girl",
    username: "gunsnrosesgirl3",
    bio: "science in context, art history and some puzzles to solve"
  },
  {
    userImg: "Images/profile pics/20231231_124613.jpg",
    user: "rare insults",
    username: "insultsrare",
    bio: "the most unique insults on the planet"
  },
  {
    userImg: "Images/profile pics/20231122_172158.jpg",
    user: "Holly - I like tech",
    username: "AnxiouslyHolly",
    bio: "Fan of Samsung/Android | OneUI & IOS"
  },
  {
    userImg: "Images/profile pics/20240121_143633.jpg",
    user: "Shon",
    username: "0xShon",
    bio: "9 |Web3 & AI🤿|Tech enthusiast by Day, Code Ninja by Night🛠️"
  },
  {
    userImg: "Images/profile pics/20231231_124613.jpg",
    user: "Hourly memes",
    username: "hourly_shitpost",
    bio: "the best memes ever created… we wouldn’t be here without them (NO NSFW PROMOS)"
  },
  {
    userImg: "Images/profile pics/20240107_114844.jpg",
    user: "Corn",
    username: "upblissed",
    bio: "LLS🕊️ LLC🕊️ LLB🕊️ LLN🕊️ LLI🕊️ LLK🕊️ LLG💔 LLT👼🏾 LLO🕊️💔 AND IT’S STILL FUK DA OPPS💔🖕 #WAMMYFREE🤫𐕣🪬 📧: salim@devourtalent.com"
  },
  {
    userImg: "Images/profile pics/20231231_124613.jpg",
    user: "I like food",
    username: "messedupfoods",
    bio: "food enjoyer"
  },
  {
    userImg: "Images/GFeMGHpaAAAnaTF.jpeg",
    user: "Solo Leveling",
    username: "sololeveling_en",
    bio: "Jinwoo's about to become stronger than anyone ever imagined possible. Solo Leveling is streaming now, only on  @Crunchyroll!"
  },
  {
    userImg: "Images/profile pics/20231122_172158.jpg",
    user: "Instablog9ja",
    username: "instablog",
    bio: "24/7 News. Fashion. Lifestyle. Entertainment || || Contact Us: instablog9jacs@gmail.com"
  },
  {
    userImg: "Images/profile pics/20240107_114844.jpg",
    user: "Insane Reality Leaks",
    username: "InsaneReality",
    bio: "Not the way they taught you"
  },
  {
    userImg: "Images/profile pics/20240107_114917.jpg",
    user: "internet hall of fame",
    username: "InternetH0F",
    bio: "alt @TPayst | credit is given when original source is known. if no credit is listed, OP can DM us with credit request"
  },
  {
    userImg: "Images/profile pics/wallpaperflare.com_wallpaper.jpg",
    user: "Scrimba",
    username: "scrimba",
    bio: "Our courses help motivated students become hireable frontend developers at 1% of the price of a coding bootcamp. 🔗 https://linktr.ee/scrimba"
  }
]
messageData = [
  {
    img: 'Images/profile pics/20240107_114917.jpg',
    name: 'Collins Onuoha',
    username: 'linzxx',
    date: '',
    message: 'This abuja get money o!'
  },
  {
    img: 'Images/profile pics/20240107_114844.jpg',
    name: 'Anita Onuoha',
    username: 'ezyne',
    date: '',
    message: 'You made me forget my charger'
  },
  {
    img: 'Images/profile pics/20240310_144314.jpg',
    name: 'Franklin Onuoha',
    username: 'frankwalker',
    date: '',
    message: 'Going to the dentist'
  },
  {
    img: 'Images/profile pics/20231231_124613.jpg',
    name: 'Favour Onuoha',
    username: 'strictImperfectionz',
    date: '',
    message: 'Money don land for the motor'
  }
  
]

//functions to render tweets , trends and toFollow sections
function renderTweets(data){
  const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
  ]
data.forEach((item)=>{
  const  tweetFeed = document.querySelector('.main-feed')
  const TweeT = document.createElement('div')
  TweeT.classList.add('tweet')

  let posteddate = new Date()
  const  month = months[posteddate.getMonth(0)]
  const date = posteddate.getDate()
  const newdate =  date +' '+ month

  TweeT.innerHTML = `
      <div class="tweetInfo">
          <div class="profilePic">
              <img src="${item.profileImg}" alt="">
          </div>

          <div class="tweetContainer">
              <div class="info">
                <span class="name">${item.name}</span>
                <span class="verified">
                    <i class="${item.verified}"></i>
                </span>
                <span class="username">@${item.username}</span>
                <span class="dot">·</span>
                <span class="timeStamp">${item.date}</span>
                <span class="option">
                    <i class="fa-solid fa-ellipsis"></i>
                </span>
                <div class="option-table">
                  <div class="options">
                      <div class="icon">
                          <i class="fa-regular fa-face-meh-blank"></i>
                      </div>
                      <div class="text">
                          <span>Report Tweet</span>
                      </div>
                  </div>
                  <div class="options">
                      <div class="icon">
                          <i class="fa-regular fa-face-meh-blank"></i>
                      </div>
                      <div class="text">
                          <span>Add/remove from @${item.username} from lists</span>
                      </div>
                  </div>
                </div>

              </div>

              <div class="content">
                  <p class="text">
                      ${item.tweet}
                  </p>
                  <img src="${item.img}" alt="">
                  <span class="tags">${item.tags}</span>

                  <div class="tweetBtns">
                      <div class="interactionBtns">
                          <span class="btn comment">
                              <i class="fa-regular fa-comment"></i>
                              <span>${item.comments}k</span>
                          </span>

                          <span class="btn retweet">
                              <i class="fa-solid fa-retweet"></i>
                              <span>${item.retweets}k</span>
                          </span>

                          <span class="btn like">
                              <i class="fa-regular fa-heart"></i>
                              <span>${item.likes}k</span>
                          </span>

                          <span class="btn chart">
                              <i class="fa-solid fa-chart-simple"></i>
                              <span>${item.chart}k</span>
                          </span>


                          <div class="trafficShareBtns">
                              <span class="bookmark">
                                  <i class="fa-regular fa-bookmark"></i>
                              </span>

                              <span class="share">
                                  <i class="fa-solid fa-arrow-up-from-bracket"></i>
                              </span>
                          </div>

                      </div>
                  </div>
              </div>
          </div>
      </div>
  `
  // Event listeners for interaction button
  const interactionBtns = TweeT.querySelectorAll('.interactionBtns .btn')
  interactionBtns.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
      let pressedBtn = e.currentTarget
      let condition = pressedBtn.classList.contains('like') || pressedBtn.classList.contains('comment')

      pressedBtn.children[1]++
      console.log(pressedBtn.children[1])

      if(condition){
        pressedBtn.children[0].classList.toggle('fa-solid')
      }
      // change colors of btns
      if(pressedBtn.classList.contains('like')){
      pressedBtn.classList.toggle('liked')
      }
      if(pressedBtn.classList.contains('comment')){
          pressedBtn.classList.toggle('commented')
      }
      if(pressedBtn.classList.contains('retweet')){
        pressedBtn.classList.toggle('retweeted')
      }
      console.log('working well done')
      
    })
  })
  //bookmark button event
  const bookmark = TweeT.querySelector('.bookmark')
  const bookmarked = document.querySelector('.bookmarked')
  bookmark.addEventListener('click',()=>{
    let book = bookmark.childNodes[1].classList
    if(!book.contains('fa-solid')){
      book.add('fa-solid')
      bookmark.style = `color: rgb(10, 156, 240);`
      bookmarked.style = `transform: translateY(1%);`
      bookmarked.childNodes[3].textContent = 'Added to bookmarks'
      setTimeout(() => {
        bookmarked.style='transform: translateY(-100%);'
      }, 1000);
    }else if(book.contains('fa-solid')){
      book.remove('fa-solid')
      bookmark.style = `color: grey;`
      bookmarked.style = `transform: translateY(1%);`
      bookmarked.childNodes[3].textContent = 'Removed from bookmarks'
      setTimeout(() => {
        bookmarked.style='transform: translateY(-100%);'
      }, 1000);
    }
  })

  //Tweets Options button event
  const tweetOptions = TweeT.querySelector('.option')
  tweetOptions.addEventListener("click", ()=>{
    tweetOptions.parentElement.children[6].classList.toggle('show-option-table')
  })

  //escape button function event
  window.addEventListener('keydown', function(e){
      if((e.key=='Escape'||e.key=='Esc'||e.keyCode==27) ){
        tweetOptions.parentElement.children[6].classList.remove('show-option-table')
      // this.alert('works')
      }
  });

  // append  tweet to the page
  tweetFeed.appendChild(TweeT)
})
}
function renderAsideTrends(data , where){
  const container = document.querySelector(`${where}`)
  data.forEach((item)=>{
    const trend = document.createElement( 'div' )
    trend.classList.add('trend')
    trend.innerHTML =  `

          <div class="info">
              <span class="trend-note">${item.category} · Trending</span>
              <span class="text">
                  ${item.topic}
              </span>
              <span class="post-count">${item.postCount} posts</span>
          </div>
          <span class="option">
              <i class="fa-solid fa-ellipsis" aria-hidden="true"></i>
          </span>
          <div class="option-table">
            <div class="options">
                <div class="icon">
                    <i class="fa-regular fa-face-meh-blank"></i>
                </div>
                <div class="text">
                    <span>Not intrested in this</span>
                </div>
            </div>
            <div class="options">
                <div class="icon">
                    <i class="fa-regular fa-face-meh-blank"></i>
                </div>
                <div class="text">
                    <span>This trend is harmful or spammy</span>
                </div>
            </div>
          </div>
    `
    // event listener for click on the option icon to show options table
    //Trend Options button event
  const tweetOptions = trend.querySelector('.option')
  tweetOptions.addEventListener("click", ()=>{
    tweetOptions.parentElement.children[2].classList.toggle('show-option-table')
  })

  //escape button function event
  window.addEventListener('keydown', function(e){
      if((e.key=='Escape'||e.key=='Esc'||e.keyCode==27) ){
        tweetOptions.parentElement.children[2].classList.remove('show-option-table')
      // this.alert('works')
      }
  });
    // APPEND 
    container.appendChild(trend)
})
}
function renderToFollow(data , where){
  const container = document.querySelector(`${where}`)
  data.forEach((item)=>{
    const toFollow = document.createElement( 'div' )
    toFollow.classList.add('follow')
    toFollow.innerHTML =  `

<div class="info">
    <div class="left">
        <div class="img">
            <img src="${item.userImg}" alt="">
        </div>
    </div>
    <div class="right">
        <div class="top">
            <div class="user">
                <span class="name">
                    ${item.user}
                    <span class="verified">
                        <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
                    </span>
                </span>
                <span class="username">@${item.username}</span>
            </div>
            <span class="btn">
                follow
            </span>
        </div>
        <div class="bio">${item.bio}</div>
    </div>
</div>
    `
    
    const follow = toFollow.querySelector('.btn')
    follow.addEventListener("click",()=>{
      if(!follow.classList.contains( "foll" )){
        follow.textContent = "unfollow" 
        follow.classList.add("foll")
      }else if(follow.classList.contains( "foll" )){
         follow.textContent = " follow"
         follow.classList.remove("foll")
      }
    })

    // append 
    container.appendChild(toFollow)


    // bio data
    const bio = document.querySelectorAll('.bio')
    bio.forEach((b)=>{
      // if(b.parentElement.parentElement.parentElement.parentElement.classList.contains('follow-container')){
      //   b.style.display = "none"
      // }
      b.parentElement.parentElement.parentElement.parentElement.classList.contains('follow-container')  ?  
      b.style.display='none' : b.style.display= 'block'
    })
    // console.log()

})
}
function messages(data){
  const msg = document.querySelector('.msg-box')
  data.forEach((item)=>{
    const message = document.createElement('div')
    message.classList.add('message')

    message.innerHTML = `
      <div class="img">
          <img src="${item.img}" alt="">
      </div>
      <div class="info">
          <div class="top">
            <div> 
              <p class="name">${item.name}</p>
              <span class="verified">
                  <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
              </span>
              <p class="username">@${item.username}</p>
              <span class="dot"> · </span>
              <span class="timeStamp = day + month;">Feb 23, 2024</span>
            </div>
            <span class="option">
              <i class="fa-solid fa-ellipsis" aria-hidden="true"></i>
            </span>
          </div>
          <div class="bottom">
              <span>
                  ${item.message}
              </span>
          </div>

      </div>
    `
    //append 
    msg.appendChild(message)
  })

  msg.parentElement.childNodes[1].addEventListener("click",()=>{
    msg.parentElement.parentElement.classList.toggle('msg-show')
    let arrow = msg.parentElement.childNodes[1].childNodes[3].childNodes[3]
    msg.parentElement.parentElement.classList.contains('msg-show') ? arrow.style='transform: rotate(180deg);' : arrow.style=`transform: rotate(0deg);`
    // console.log(arrow)
  })
}


// focus states of search bar
const search = document.querySelector('.search')
let focuss = search.childNodes[1].childNodes[3]
focuss.addEventListener('focusin',()=>{
  search.childNodes[1].childNodes[3].parentElement.style = `outline: 2px solid  rgb(10, 156, 240);`
  search.childNodes[1].childNodes[3].parentElement.childNodes[1].style = `color: rgb(10, 156, 240);`
  // console.log(search.childNodes[1].childNodes[3].parentElement.childNodes[1])
})
focuss.addEventListener('focusout',()=>{
  search.childNodes[1].childNodes[3].parentElement.style = `outline: 0;`
  search.childNodes[1].childNodes[3].parentElement.childNodes[1].style = `color: grey;`
})


//aside functions
const asideShowmore = document.querySelectorAll('.aside .showmore')
const smallTrends = document.querySelector('.hot-topic')
const fullTrends = document.querySelector('.full-hot-topic')
const smallFollow = document.querySelector('.to-follow')
const fullFollow = document.querySelector('.full-to-follow')
const headL = document.querySelector('.tweetFeed .main')

renderAsideTrends(trendData , `.full-hot-topic .topics`)
renderToFollow(toFollowData , `.full-to-follow .connect`)
asideShowmore.forEach((btn)=>{
  btn.onclick = ()=>{
    let btns = btn.parentElement.classList
    headL.style.display = "none"
    if(btns.contains('hot-topic')){
      smallTrends.style.display = "none"
      fullTrends.style.display = "block"
      smallFollow.style.display = 'flex'
      fullFollow.style.display = 'none'
    }else{
      smallFollow.style.display = 'none'
      fullFollow.style.display = 'block'
      smallTrends.style.display = "flex"
      fullTrends.style.display = "none"
    }


    
    // console.log(btns)
  }
})
const back = document.querySelectorAll('.back-home')
back.forEach((btn)=>{
  btn.onclick = ()=>{

    fullFollow.style.display ="none" 
    fullTrends.style.display = "none"
    smallFollow.style.display = "flex"
    smallTrends.style.display = "flex"
    headL.style.display = "block"
    console.log("WTF")
  }
})
window.addEventListener('resize', ()=>{
  fullFollow.style.display ="none" 
  fullTrends.style.display = "none"
  smallFollow.style.display = "flex"
  smallTrends.style.display = "flex"
  headL.style.display = "block"
})
