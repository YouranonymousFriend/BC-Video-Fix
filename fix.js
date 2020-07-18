document.getElementById("fixVideo").addEventListener('click', () => {

    function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
        return document.getElementById('player').innerHTML;
    }

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
		fixedUrl = searchBuggyVideo(results[0]);
		chrome.tabs.update({url:fixedUrl});
    });
	
});

document.getElementById("dlVideo").addEventListener('click', () => {

    function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
        return document.getElementById('player').innerHTML;
    }

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
		fixedUrl = searchBuggyVideo(results[0]);
    document.getElementById('download').href = fixedUrl;
    document.getElementById('download').click();
    });
	
});

function searchBuggyVideo(dom) {
	var regex = /<source.*?src='(.*?)'/;
	dom = dom.replace(/ +(?= )/g,'');
	dom = dom.replace(/(\r\n|\n|\r)/gm, "");
	dom = dom.replace(/"/g, '\'');
	var videosource = regex.exec(dom)[1];
	splitSrc = videosource.split(/(seed\d\d\d)/);
	returnUrl = videosource.replace(splitSrc[1], "seed126");
	return returnUrl;
}