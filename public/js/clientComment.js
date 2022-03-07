const protocol = window.location.protocol;
const host = window.location.host;
const pathname = window.location.pathname;
const id = parseInt(pathname.substring(pathname.lastIndexOf("/") + 1));

fetch(`${protocol}//${host}/data/${id}`)
	.then(resp => resp.json())
	.then(data => renderCommentPage(data))
	.catch(e => console.log(`Error: ${e}`));

function renderCommentPage(data) {
	renderCommentNote(data);
	renderCommentHeader(data);
	renderComments(data);
}

function renderCommentNote(data) {
	const notesGrid = document.querySelector("#notesGrid");
	notesGrid.insertAdjacentElement("beforeend", buildNoteElement(data));
	const heart = document.querySelector(`#heart${id}`);
	const thumbs = document.querySelector(`#thumbs${id}`);
	const neutral = document.querySelector(`#neutral${id}`);

	addEmojiFunctionality(heart, "heart", id);
	addEmojiFunctionality(thumbs, "thumbs", id);
	addEmojiFunctionality(neutral, "neutral", id);
	notesGrid.style.opacity = 1;
}

function renderCommentHeader(data) {
	const commentHeader = document.querySelector("#commentHeader");
	let commentCount;
	data.comments ? commentCount = data.comments.length : commentCount = 0;
	let commentText;
	commentCount == 1 ? commentText = "Comment" : commentText = "Comments";
	commentHeader.textContent = `${commentCount} ${commentText}`;
}

function renderComments(data) {
	const commentsSection = document.querySelector("#commentsSection");
	for (let i = 0; i < data.comments.length; i++) {
		commentsSection.insertAdjacentHTML("beforeend", `<h3 class="comment">${i+1}. ${data.comments[i]}</h3>`);
	}
	commentsSection.style.backgroundColor = data.color;
}

const commentBox = document.querySelector("#commentBox");
commentBox.addEventListener('keyup', updateTextBoxCounter);
commentBox.addEventListener('keydown', updateTextBoxCounter);
