var NotesManager = (function ModuleFactory(){

	function addNote(note) {
		$notes.prepend(
			$("<a href='#'></a>")
			.addClass("note")
			.text(note)
		);
	}

	function addCurrentNote() {
		var current_note = $("#note").val();

		if (current_note) {
			notes.push(current_note);
			addNote(current_note);
			$("#note").val("");
		}
	}

	function showHelp() {
		$("#help").show();

		document.addEventListener("click",function __handler__(evt){
			evt.preventDefault();
			evt.stopPropagation();
			evt.stopImmediatePropagation();

			document.removeEventListener("click",__handler__,true);
			hideHelp();
		},true);
	}

	function hideHelp() {
		$("#help").hide();
	}

	function handleOpenHelp(evt) {
		if (!$("#help").is(":visible")) {
			evt.preventDefault();
			evt.stopPropagation();

			showHelp();
		}
	}

	function handleAddNote(evt) {
		addCurrentNote();
	}

	function handleEnter(evt) {
		if (evt.which == 13) {
			addCurrentNote();
		}
	}

	function handleDocumentClick(evt) {
		$notes.removeClass("active");
		$notes.children(".note").removeClass("highlighted");
	}

	function handleNoteClick(evt) {
		evt.preventDefault();
		evt.stopPropagation();

		$notes.addClass("active");
		$notes.children(".note").removeClass("highlighted");
		$(evt.target).addClass("highlighted");
	}

	function init(opts) {
		$notes = $(opts.notes);
		$open_help = $(opts.open_help);
		$add_note = $(opts.add_note);
		$new_note = $(opts.new_note);

		// build the initial list from the existing `notes` data
		var html = "";
		for (i=0; i<notes.length; i++) {
			html += "<a href='#' class='note'>" + notes[i] + "</a>";
		}
		$notes.html(html);

		// listen to "help" button
		$open_help.bind("click",handleOpenHelp);

		// listen to "add" button
		$add_note.bind("click",handleAddNote);

		// listen for <enter> in text box
		$new_note.bind("keypress",handleEnter);

		// listen for clicks outside the notes box
		$(document).bind("click",handleDocumentClick);

		// listen for clicks on note elements
		$notes.on("click",".note",handleNoteClick);
	}

	var notes = [];

	var $notes;
	var $open_help;
	var $add_note;
	var $new_note;

	function loadData(data){
		notes = notes.concat(data);
	}

	var publicAPI = {
		init: init,
		loadData: loadData
	};

	return publicAPI;

})();

NotesManager.loadData(
	// assume this data came from the database
	[
		"This is the first note I've taken!",
		"Now is the time for all good men to come to the aid of their country.",
		"The quick brown fox jumped over the moon."
	]
);


$(document).ready(function(){
	NotesManager.init({
		notes: '#notes',
		open_help: '#open_help',
		add_note: '#add_note',
		new_note: '#new_note'
	});
});
