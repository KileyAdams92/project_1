#     project_1
# 
	Video Jukebox: 
	
	This is a social web application designed to enable groups of users to construct a 
	common music video playlist through searches of artists and song titles. With the 
	program a user enters a song title and artist’s name and selects a video duration 
	length. The program returns matching song lyrics and displays a number of videos to 
	review. The user can watch the video, and either upload the video (and an optional 
	comment) to the group playlist or return to select again from the original search 
	results. The user can watch the selected video playlist at any time. 
	
	Built With:
	•	The Bootstrap 4.0 library for designing websites and web applications.
	•	Google Firebase for making web applications without server-side programming. 
	•	The jQuery JavaScript library for simplifying the client-side scripting of HTML. 
	•	The Cloudflare AJAX technology for creating asynchronous Web applications. 
	•	The Anime JavaScript library for animating applications. 
	•	The Musixmatch Lyrics API for obtaining song lyrics 
	•	The YouTube Data API for obtaining video search results. 
	
	Authors:
	•	Kiley Adams, Patrick Kearney, Frank Dominquez 
	
	The idea for the project and page layout were jointly developed by Kiley and Patrick. 
	The HTML code was written by Kiley with minor contributions from Patrick regarding 
	the code for the video display area and playlist tables.

	All CSS styling for the project was done by Kiley Adams. 
	
	The JavaScript code was jointly written by Kiley and Patrick. Kiley wrote the code 
	for incorporating the Anime.js, the retrieval of information from the search form, 
	the utilization of the Musixmatch Lyrics API, and the display of lyrics. Patrick 
	wrote the code for the utilization of the YouTube Data API, the storage of the 
	retrieved information into an array of objects and the functions for its use in 
	video selection and uploading. Patrick also wrote the code for moving and retrieving 
	information from Firebase and its subsequent use in the video playlists. All 
	functions for creating the dynamic element and content that were deployed in the 
	video selection, video review, playlist construction, and video playback portions of
	the program were written by Patrick. 
	
	Frank Dominguez conducted limited testing of final versions of the program. 
	
	Known Issues: 
	•	The CORS Toggle extension version 1.1.1 for Chrome Browsers can impede the 
	viewing of YouTube videos on the macOS. (known issue) At present it is necessary to
	have the CORS extension on to view the lyrics in a search. However, as a result the 
	video data from YouTube will not load. Video playback will begin when the CORS Toggle
	extension is turned off in the Chrome extensions manager (not toggled off in the 
	browser display). It will need to be re-activated and toggled “on”, after all YouTube 
	video display elements are closed on the page to enable lyrics retrieval in the next 
	search. 
	
	•	The Musixmatch Lyrics API does not employ an https protocol. As such, the 
	application cannot be deployed from GitHub. We were able to overcome this issue by 
	deploying the application via Heroku.

	http://project-1-jukebox.herokuapp.com 
	
	License:  This project is licensed under the MIT License. 
	
	Acknowledgments 
	•	The project, in part, was inspired by the lessons in Firebase and  
	assignments in the  University of Kanas Coding Bootcamp Program.

	•	Thanks to Garret Glitzen for assistance in deploying the site on Heroku, 
	and Byron Ferguson and Cameron Chapman for assistance with GitHub and general advice 
	on the project.


