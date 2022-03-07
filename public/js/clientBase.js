window.addEventListener("pageshow", e => {
	let historyTraversal;
	window.performance.getEntriesByType("navigation")[0].type === "back_forward" ? historyTraversal = true : historyTraversal = false;
	console.log(historyTraversal)
	if (historyTraversal) {
		// Handle page restore.
		window.location.reload();
	}
});