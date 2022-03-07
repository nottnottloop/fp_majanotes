window.addEventListener("pageshow", e => {
	let historyTraversal;
	window.performance.getEntriesByType("navigation")[0].type === "back_forward" ? historyTraversal = true : historyTraversal = false;
	console.log(historyTraversal)
	if (historyTraversal) {
		// Handle page restore.
		window.location.reload();
	}
});

function updateTextBoxCounter(e) {
	let len = 0;
	if (e.currentTarget.value.length) {
		len = e.currentTarget.value.length;
	}
  if (len >= 200 + 1) {
    e.currentTarget.value = e.currentTarget.value.substring(0, 200);
  } else {
    document.querySelector('#charNum').textContent = 200 - len;
  }
}

function addAllEmojiFunctionality(id) {
	const heart = document.querySelector(`#heart${id}`);
	const thumbs = document.querySelector(`#thumbs${id}`);
	const neutral = document.querySelector(`#neutral${id}`);

	addEmojiFunctionality(heart, "heart", id);
	addEmojiFunctionality(thumbs, "thumbs", id);
	addEmojiFunctionality(neutral, "neutral", id);
}