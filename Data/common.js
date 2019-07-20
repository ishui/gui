// Global constants
var replacementChar = /%s/
var numMetadataItems = 7
var timeoutID
var playing
var showPlayStopInternal

// Global variables
var outputSubTitle
var imagesOnAPage
var index

function parseCommandLine() {
	if (location.href.indexOf("?") == -1) {
		return 0
	}

	// Parse any command line arguments
	urlQuery = location.href.split("?")

	urlTerms = urlQuery[1].split(",")
	if (urlTerms[0] != null) {
		index = parseInt(urlTerms[0])
	}

	if (urlTerms[1] != null) {
		playing = parseInt(urlTerms[1])
	}
}

function printBodyStartTag() {
	document.write("<BODY BGCOLOR=\"" + BGCOLOR + "\" TEXT=\"" + TEXT + "\" LINK=\"" + LINK + "\" VLINK=\"" + VLINK + "\" ALINK=\"" + ALINK + "\">")
   document.write("<STYLE TYPE=\"text/css\">")
   
	document.write(".pageFont")
	document.write("{")
	document.write(pageFontFamily)
	document.write(pageFontSize)
	document.write("}")
	
   document.write(".thumbFont")
	document.write("{")
	document.write(thumbFontFamily)
	document.write(thumbFontSize)
	document.write(thumbFontColor)
	document.write("}")
	
	document.write(".imageFont")
	document.write("{")
	document.write(imageFontFamily)
	document.write(imageFontSize)
	document.write(imageFontColor)
	document.write("}")
	
	document.write("</STYLE>")
}

function stopStartSlideShow(firstTime) {
	if (playing == 1) {
		playing = 0
		clearTimeout(timeoutID)
		
		if (firstTime != 1)
		{
			index = -1
			slideShow()
		}
	}
	else {
		playing = 1
		timeoutID = setInterval("slideShow()", delay)
	}
}

function slideShow() {
	index = index + 1
	if (index >= imageDB.length) {
		index = 0
	}

	// Change the image
	window.location.href = "page.htm?" + index + "," + playing
	

	// Change the play text to stop
	slideShowControl.innerText="Stop";
}

function init(showPlayStop) {
	// Make output strings from theme.js and data.js
	outputSubTitle = themeSubTitle.replace(replacementChar, subTitle);
	
	// Perform some initial calculations
	imagesOnAPage = rows*columns
	
	playing = 0
	index = 0
	parseCommandLine()
	
	showPlayStopInternal = 1;
	if (themeShowPlayStop == 0) {
		if (showPlayStop == 0) {
			showPlayStopInternal = 0;
		}
	}

	// Start or stop the slideshow
	if (playing == 0) {
		playing = 1
	}
	else {
		playing = 0
	}
	stopStartSlideShow(1)
}

function printTitle(writePageTitle) {
   if (strip == 1 && writePageTitle == 0) {
      return
   }
   
   var tempTitle = themeThumbTitle;
   if (writePageTitle == 1) {
      tempTitle = themeImageTitle;
   }
   
	document.write("<DIV CLASS=\"title_div\">")
	document.write("<SPAN CLASS=\"pageFont\">")
  var outputTitle = tempTitle.replace(replacementChar, title);
  //window.alert(outputTitle);
	document.write(outputTitle)
	document.write("</SPAN>")
	document.write("</DIV>")
}

function printSubTitle(writePageSubTitle) {
   if (strip == 1 && writePageSubTitle == 0) {
      return
   }
	document.write("<DIV CLASS=\"subtitle_div\">")
	document.write("<SPAN CLASS=\"pageFont\">")
	document.write(outputSubTitle)
	document.write("</SPAN>")
	document.write("</DIV>")
}

function printImage() {
	document.write("<DIV align=\"center\" CLASS=\"image_div\">")
	document.write("<TABLE>")
	document.write("<TD>")
	document.write("<TR valign=middle>")
	document.write("<TD align=center>")
	outputImageLink = themeImageLink.replace(replacementChar, index);
	outputImageLink = outputImageLink.replace(replacementChar, playing);
	document.write(outputImageLink)
	document.write("</TD>")
	document.write("</TR>")
   for (var i = index*numMetadataItems; i < index*numMetadataItems+numMetadataItems; i++) {
	   document.write("<TR valign=middle>")
	   document.write("<TD CLASS=\"imageFont\" align=center>" + imageMetadataDB[i] + "</TD>")
	   document.write("</TR>")
   }
	document.write("</TD>")
	document.write("</TABLE>");
	document.write("</DIV>")
}

function writeLinks(writePageLinks) {
   if (strip == 1 && writeLinks == 1) {
      return
   }
   
  var themeURLHolder = themeImageLinkURL
  var themeFirstHolder = themeImageLinkFirst
	var themeLastHolder = themeImageLinkLast
	var themePreviousHolder = themeImageLinkPrevious
	var themeNextHolder = themeImageLinkNext
	var themePlayHolder = themeImageLinkPlay
	var themeStopHolder = themeImageLinkStop
	if (writePageLinks == 1)
	{
	  themeURLHolder = themeThumbLinkURL
		themeFirstHolder = themeThumbLinkFirst
		themeLastHolder = themeThumbLinkLast
		themePreviousHolder = themeThumbLinkPrevious
		themeNextHolder = themeThumbLinkNext
		themePlayHolder = themeThumbLinkPlay
		themeStopHolder = themeThumbLinkStop
	}

	document.write("<DIV align=\"center\" CLASS=\"links_div\">")
	document.write("<TABLE>")
	document.write("<TR>")
		
	// Write Home URL
	document.write("<TD CLASS=\"pageFont\">")
	document.write("<DIV CLASS=\"url_div\">")
	var url = themeURLHolder.replace(replacementChar, URL);
	url = url.replace(replacementChar, urlMouseOverText);
  url = url.replace(replacementChar, urlMouseOverText);
	document.write(url)
	document.write("</DIV>")
	document.write("</TD>")
	
	// Write play/stop
	if (showPlayStopInternal == 1) {
		document.write("<TD CLASS=\"pageFont\">")
		document.write("<DIV CLASS=\"slideShowControl_div\">")
		if (playing == 1) {
			themeStopHolder = themeStopHolder.replace(replacementChar, stopMouseOverText);
			document.write(themeStopHolder)
		}
		else {
		  themePlayHolder = themePlayHolder.replace(replacementChar, playMouseOverText);
			document.write(themePlayHolder)
		}
		document.write("</DIV>")
		document.write("</TD>")
	}
		
	// Write first link
	if (index != 0) {
	  document.write("<TD CLASS=\"pageFont\">")
	  document.write("<DIV CLASS=\"first_div\">")
		if (writePageLinks == 0) {
			outputFirstLink = themeFirstHolder.replace(replacementChar, playing);
			outputFirstLink = outputFirstLink.replace(replacementChar, firstMouseOverText);
			document.write(outputFirstLink)
		}
		else {
			if (index != 0) {
				outputFirstLink = themeFirstHolder.replace(replacementChar, playing);
				outputFirstLink = outputFirstLink.replace(replacementChar, firstMouseOverText);
				document.write(outputFirstLink)
			}
		}
		document.write("</DIV>")
		document.write("</TD>")
	}
	
	// Write previous link
	if (index != 0) {
	  document.write("<TD CLASS=\"pageFont\">")
	  document.write("<DIV CLASS=\"previous_div\">")
		var previousIndex
		if (writePageLinks == 0) {
			previousIndex = index - 1;
			outputPreviousLink = themePreviousHolder.replace(replacementChar, previousIndex);
			outputPreviousLink = outputPreviousLink.replace(replacementChar, playing);
			outputPreviousLink = outputPreviousLink.replace(replacementChar, previousMouseOverText);
			document.write(outputPreviousLink)
		}
		else {
			if (index != 0) {
				previousIndex = index-imagesOnAPage;
				if (previousIndex < 0) {
					previousIndex = 0	  		
				}
				outputPreviousLink = themePreviousHolder.replace(replacementChar, previousIndex);
				outputPreviousLink = outputPreviousLink.replace(replacementChar, playing);
				outputPreviousLink = outputPreviousLink.replace(replacementChar, previousMouseOverText);
				document.write(outputPreviousLink)
			}
		}
		document.write("</DIV>")
		document.write("</TD>")
	}
		
	// Write next link
	var nextIndex
	if (writePageLinks == 0) {
		nextIndex = index + 1;
		if (nextIndex < imageDB.length) {
			document.write("<TD CLASS=\"pageFont\">")
			document.write("<DIV CLASS=\"next_div\">")
			outputNextLink = themeNextHolder.replace(replacementChar, nextIndex);
			outputNextLink = outputNextLink.replace(replacementChar, playing);
			outputNextLink = outputNextLink.replace(replacementChar, nextMouseOverText);
			document.write(outputNextLink)
			document.write("</DIV>")
			document.write("</TD>")
		}
	}
	else {
	    nextIndex = index+imagesOnAPage;
		if (nextIndex < thumbDB.length) {
			document.write("<TD CLASS=\"pageFont\">")
			document.write("<DIV CLASS=\"next_div\">")
			outputNextLink = themeNextHolder.replace(replacementChar, nextIndex);
			outputNextLink = outputNextLink.replace(replacementChar, playing);
			outputNextLink = outputNextLink.replace(replacementChar, nextMouseOverText);
			document.write(outputNextLink)
			document.write("</DIV>")
			document.write("</TD>")
		}
	}
		
	// Write last link
	var lastIndex
	if (writePageLinks == 0) {
		lastIndex = imageDB.length-1;
		if (index < imageDB.length-1 && lastIndex < imageDB.length) {
			document.write("<TD CLASS=\"pageFont\">")
			document.write("<DIV CLASS=\"last_div\">")
			outputLastLink = themeLastHolder.replace(replacementChar, lastIndex);
			outputLastLink = outputLastLink.replace(replacementChar, playing);
			outputLastLink = outputLastLink.replace(replacementChar, lastMouseOverText);
			document.write(outputLastLink)
		}
	}
	else {
		lastIndex = thumbDB.length - imagesOnAPage;
		if (lastIndex < 0) {
			lastIndex = 0;
		}
		if (index < lastIndex) {
			document.write("<TD CLASS=\"pageFont\">")
			document.write("<DIV CLASS=\"last_div\">")
		  outputLastLink = themeLastHolder.replace(replacementChar, lastIndex);
			outputLastLink = outputLastLink.replace(replacementChar, playing);
			outputLastLink = outputLastLink.replace(replacementChar, lastMouseOverText);
			document.write(outputLastLink)
			document.write("</DIV>")
			document.write("</TD>")
	  }
	}
	
	document.write("</TR>")
	document.write("</TABLE>")
	document.write("</DIV>")
}

function printTable() {
	document.write("<DIV align=\"center\" CLASS=\"images_div\">")
	document.write("<TABLE>")
	counter = index
	for (var i = 0; i < rows; i++) {
		document.write("<TR>")
		for (var j = 0; j < columns; j++) {
			if (counter < thumbDB.length) {
				document.write("<TD>")
				document.write("<TABLE>")
				document.write("<TD valign=top>")
				document.write("<TR>")
				document.write("<TD align=center>")
				outputThumbLink = themeThumbLink.replace(replacementChar, counter)
				outputThumbLink = outputThumbLink.replace(replacementChar, playing)
				document.write(outputThumbLink)
				document.write("</TD>")
				document.write("</TR>")
				
				// Write out the metadata
				for (var k = counter*numMetadataItems; k < counter*numMetadataItems+numMetadataItems; k++) {
				   document.write("<TR valign=middle>")
				   document.write("<TD CLASS=\"thumbFont\" align=center>" + thumbMetadataDB[k] + "</TD>")
				   document.write("</TR>")
				}
				document.write("</TD>")
				
				document.write("</TABLE>");
				document.write("</TD>")
			}

			counter++
		}
		document.write("</TR>")
	}
	document.write("</TABLE>")
	document.write("</DIV>")
}

function loadImages() {
	for (var i = 0; i < imagesOnAPage; i++) {
		if ((i+index) < thumbDB.length) {
			var j = 0
			while (document.images[j] != null && document.images[j].name == "IGNORE") {
				j++
			}
			if (document.images[i+j] != null) {
				document.images[i+j].src = thumbDB[i+index]
			}
		}
	}
}

function loadImage() {
   var i = 0
   while (document.images[i].name == "IGNORE") {
      i++
   }
	document.images[i].src = imageDB[index]
}