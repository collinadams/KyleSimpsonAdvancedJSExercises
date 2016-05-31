function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way

function getFile(file) {
	return new Promise(function(resolve){
			fakeAjax(file,resolve);
	});
}


// request all files at once in "parallel"
var fakeUrlArr = ['file1', 'file2', 'file3'];

fakeUrlArr
.map(getFile)
.reduce(function(chain, filePromise){
	return chain
		.then(function(){
			return filePromise;
		})
		.then(output);
	}, Promise.resolve())
.then(function(){
	console.log('Complete!');
});



// promise1
// .then(output)
// .then(function(){
// 	return promise2;
// })
// .then(output)
// .then(function(){
// 	return promise3;
// })
// .then(output)
// .then(function(){
// 	output('Complete!');
// });

