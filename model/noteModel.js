class Note {
	constructor(id, title, note, color) {
		this.id = id;
		this.title = title;
		this.note = note;
		this.color = color;
	}
}

class User {
	constructor(id,username,password){
		this.id=id;
		this.username=username;
		this.password=password;
	}
}

module.exports = {Note,User};
