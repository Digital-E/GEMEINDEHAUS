function clickEvent(newEventNode) {

    var id = newEventNode.getAttribute('id');

    Prismic.api("https://gemindehaus.cdn.prismic.io/api/v2").then(function(api) {
        return api.getByID(id);
    }).then(function(response) {
        console.log("Documents: ", response);
        loadEventToDom(response);
    }, function(err) {
        console.log("Something went wrong: ", err);
    });

}


function loadEventToDom(response) {

    // history.pushState(null, `${response.slug}`, `events/${response.slug}`);

     route(`events/${response.id}`);

    //Date Reformat
    var dateReformat = response.rawJSON.date.split('-').reverse().join('/');

    //Get Title Div
    var newsLoadedContentTopContainerContent = document.querySelector('.news-loaded-content-top-container-content');
    console.log(newsLoadedContentTopContainerContent);

    //Change Title
    newsLoadedContentTopContainerContent.children[0].innerHTML = `${response.rawJSON.title[0].text}`;

    //Change Date
    newsLoadedContentTopContainerContent.children[1].innerHTML = `${dateReformat}`;

    //Change Tag
    newsLoadedContentTopContainerContent.children[2].innerHTML = `${response.rawJSON.tag[0].text}`;

    //Change Link
    newsLoadedContentTopContainerContent.children[3].children[0].removeAttribute('href');
    newsLoadedContentTopContainerContent.children[3].children[0].setAttribute('href', `${response.rawJSON.link.url}` );


    //Get The Hidden Content Div
    var newsLoadedContent = document.querySelector('.news-loaded-content');

    //Create New Image Tag And Set Src
    var img = document.createElement('img');
    img.setAttribute('src', `${response.rawJSON.image.url}`);

    //Get Image Div
    var newsLoadedContentImages = newsLoadedContent.children[0];

    //Remove Previous Image & Add New Image
    newsLoadedContentImages.removeChild(newsLoadedContentImages.children[0]);
    newsLoadedContentImages.appendChild(img);

    //Create New Image Tag And Set Src
    var p = document.createElement('p');
    p.innerHTML = `${response.rawJSON.text[0].text}`;

    //Get Text Div
    var newsLoadedContentText = newsLoadedContent.children[1];


    //Remove Previous Text & Add New Text
    newsLoadedContentText.removeChild(newsLoadedContentText.children[0]);
    newsLoadedContentText.appendChild(p);

    //Trigger Translation Animation
    TweenMax.staggerTo(".header-subelement", 1.5, {y:'-100%', ease:Power2.easeInOut}, 0.1);

    TweenMax.staggerFromTo(".loaded-subelement", 2,{y:'100%'}, {y:'0%', ease: Circ.easeOut}, 0.1)
}