// SNI Recipe Search Integration Bootstrap | RSI_ID.js Template

var $siAssetsPath = 'http://images.foodnetwork.com/webfood/images/sales/search_integration/js/';
var $asiAssetsPath = 'http://images.foodnetwork.com/webfood/images/sales/search_integration/asi_assets/js/';

// TODO: Change to Sponsor Name: Must match keywords2013.js value and the XML directory names on Scrippsonline and FoodNetwork.com
var $siSponsor = '<RSI_ID>';
// TODO: Setup array of all keywords
var keywords = ['keyword-1', 'keyword-2', 'keyword-3', 'keyword-n'];

// get the domain
var $siDomainName = 'http://' + window.location.hostname;
var $siKeyword = '';
if ($siKeyword == '' && typeof mdManager == "object") {
  $siKeyword = mdManager.getParameterString("keyterm");
}

// Environment Flags
var isFCOM = (typeof(SNI.RZ) !== "undefined");
var isMB = ( window.location.hostname === "scrippsonline.com" );

// Hide popouts.
if( isFCOM && isMB ) $('.flyout').hide();

// Convert hyphens to spaces on foodcom
if(isFCOM) $siKeyword = $siKeyword.replace("-", " ");



// ///////////////////////////////////
// START CENTER RESULT BLOCK /////////
// ///////////////////////////////////

// Recipe Object Constructor - Set properties within keyword if block. This will be rendered into template. Escape any " with backslash. ie \"
// Values that are same across all recipes can be set here.
var CenterRecipe = function() {
  this.title = "";
  this.sponsor = "";
  this.clicktag = "";
  this.image = "";
  this.level = "";
  this.preptime = "";
  this.cooktime = "";
  this.ingredients = "";
  this.description = "";
  this.courtesyLink = "";
  this.impression1x1 = "";
  this.internalTracking = trueCount;
  this.researchTag = "";
};

// Break search into array of words
var keytermSet = $siKeyword.toLowerCase().split(" ");
// Put each mathced recipe into array.
var matchedRecipeSet = [];

/**
 * ==========================================
 * Center Results and Impression Logic
 * ==========================================
*/
if( $.inArray( 'keyword1', keytermSet ) > -1 || $.inArray( 'keyword2', keytermSet ) > -1 ){
  var centerRecipe = new CenterRecipe();
  centerRecipe.title          = "<RECIPE TITLE>";
  centerRecipe.clicktag       = "<RECIPE CLICKTAG>";
  centerRecipe.image          = "<RECIPE IMAGE PATH>";
  centerRecipe.level          = "<RECIPE DIFFICULTY>";
  centerRecipe.cooktime       = "<RECIPE COOKTIME>";
  centerRecipe.preptime       = "<RECIPE PREPTIME>"; // Food.com separate cook and prep time.
  centerRecipe.ingredients    = "<RECIPE INGREDIENTS";
  centerRecipe.impression1x1  = "<RECIPE IMPRESSION 1x1>";
  centerRecipe.description    = "<RECIPE DESCRIPTION>"; // Food.com uses a short description for each recipe.
  matchedRecipeSet.push(centerRecipe);
}

/**
 * ==========================================
 * END Center Results and Impression Logic
 * ==========================================
*/

/*================================================
=            DO NOT CHANGE BELOW CODE            =
================================================*/
if (isMB) {
  console.log("Matched Recipe Set:");
  $(matchedRecipeSet).each(function(k,i){
    console.log(i.title);
  });
}


// if more than one recipe, select random recipe
if( matchedRecipeSet.length > 1 ) {
  var centerResultKey = Math.floor((matchedRecipeSet.length * Math.random()));
  centerRecipe = matchedRecipeSet[centerResultKey];
} else {
  centerRecipe = matchedRecipeSet[0];
}

// Insert into page. This is different than the FoodNetwork version.
var $centerResult = document.getElementById('sponsorCtr2');
var centerTemplate="";
centerTemplate += "<div class=\"pod sr-recipe-item clrfix\" style=\"padding-top:0;\"  href=\"{{clicktag}}\">";
centerTemplate += "  <p style=\"font-size: 11px; text-align: center; color:#999;margin-top:7px;margin-bottom:5px;\" class=\"sponsored-title\">Sponsored Result<\/p>";
centerTemplate += "  <div id=\"recipe-drop-icon\" class=\"recipe-dd addto-dd clrfix\"> <a class=\"recipe-main-title\" href=\"{{clicktag}}\">{{title}}<\/a> <\/div>";
centerTemplate += "  <div class=\"sr-recipe-item-e\"> <a href=\"{{clicktag}}\" > <img src=\"{{image}}\" alt=\"{{title}}\"> <\/a> <\/div>";
centerTemplate += "  <div class=\"sr-recipe-item-w\">";
centerTemplate += "    <div class=\"user-info clrfix\">";
centerTemplate += "      <div class=\"sr-reviews\">";
centerTemplate += "        <p class=\"rz-tl-txt02\">Recipe courtesy of <a href=\"{{courtesyLink}}\" target=\"_blank\" title=\"{{sponsor}}\">{{sponsor}}</a></span>";
centerTemplate += "      <\/div>";
centerTemplate += "    <\/div>";
centerTemplate += "    <div class=\"cook-time-estimate\">";
centerTemplate += "      <p class=\"preptime\"> Prep Time: {{preptime}} <\/p>";
centerTemplate += "      <p class=\"time-separate\"> | <\/p>";
centerTemplate += "      <p class=\"cooktime\"> Cook Time: {{cooktime}} <\/p>";
centerTemplate += "    <\/div>";
centerTemplate += "    <div class=\"chef-desc user-info clrfix\">";
centerTemplate += "      <div class=\"rz-tl-txt02 chef-desc-dd\">";
centerTemplate += "        <a target=\"_blank\" onClick=\"window.open('{{courtesyLink}}', '_blank')\">{{sponsor}}<\/a>";
centerTemplate += "        <span>{{sponsor}} says: <\/span>";
centerTemplate += "      <\/div>";
centerTemplate += "      <p class=\"dec\">{{description}}<\/p>";
centerTemplate += "    <\/div>";
centerTemplate += "  <\/div>";
centerTemplate += "<\/div>";
centerTemplate += "  <div class=\"tableCell\">";
centerTemplate += "    <img id=\"viewTracker\" src=\"{{impression1x1}}\" style=\"visibility: hidden;\" border=\"0\" height=\"1\" width=\"1\">";
centerTemplate += "    <img id=\"viewTracker\" src=\"{{internalTracking}}\" style=\"visibility: hidden;\" border=\"0\" height=\"1\" width=\"1\">";
centerTemplate += "    <img id=\"viewTracker\" src=\"{{researchTag}}\" style=\"visibility: hidden;\" border=\"0\" height=\"1\" width=\"1\">";
centerTemplate += "  <\/div>";
centerTemplate += "";


if( $centerResult ) {
  // render center template and insert into page
  centerTemplate = centerTemplate.replace(/\{\{title\}\}/g, centerRecipe.title );
  centerTemplate = centerTemplate.replace(/\{\{sponsor\}\}/g, centerRecipe.sponsor );
  centerTemplate = centerTemplate.replace(/\{\{clicktag\}\}/g, centerRecipe.clicktag );
  centerTemplate = centerTemplate.replace(/\{\{image\}\}/g, centerRecipe.image );
  centerTemplate = centerTemplate.replace(/\{\{description\}\}/g, centerRecipe.description );
  centerTemplate = centerTemplate.replace(/\{\{cooktime\}\}/g, centerRecipe.cooktime );
  centerTemplate = centerTemplate.replace(/\{\{preptime\}\}/g, centerRecipe.preptime );
  centerTemplate = centerTemplate.replace(/\{\{ingredients\}\}/g, centerRecipe.ingredients );
  centerTemplate = centerTemplate.replace(/\{\{impression1x1\}\}/g, centerRecipe.impression1x1.replace(/\$random\$/g, (new Date()).getTime()) );
  centerTemplate = centerTemplate.replace(/\{\{courtesyLink\}\}/g, centerRecipe.courtesyLink );
  centerTemplate = centerTemplate.replace(/\{\{internalTracking\}\}/g, centerRecipe.internalTracking );
  centerTemplate = centerTemplate.replace(/\{\{courtesyLink\}\}/g, centerRecipe.courtesyLink );
  centerTemplate = centerTemplate.replace(/\{\{internalTracking\}\}/g, centerRecipe.internalTracking.replace(/\$random\$/g, (new Date()).getTime()) );

  $('#sponsorCtr2').append(centerTemplate).show();
}

// ///////////////////////////////////
// END CENTER RESULT BLOCK ///////////
// ///////////////////////////////////

// Removed keywords.js dependency
var _keywordList = {};
_keywordList[$siSponsor] = keywords;
$siStartup();

function $siStartup() {
  var exactMatch = false;
  var keywordFile = '';
  for ( x in _keywordList ) {
    if ( $siSponsor == x ) {
      for ( y in _keywordList[x] ) {
        if ( $siKeyword == _keywordList[x][y] ) {
          keywordFile = _keywordList[x][y].replace(/\s/g, '_');
          exactMatch = true;
        }
      }
      if ( !exactMatch ) {
        for ( y in _keywordList[x] ) {
          if ( $siKeyword.indexOf(_keywordList[x][y]) != -1 ) {
            keywordFile = _keywordList[x][y].replace(/\s/g, '_');
            // Enable partial matches in new engine
            $siKeyword = _keywordList[x][y].toLowerCase();
          }
        }
      }
    }
  }
  //determine css location
  //try to append css to head, if that fails append it to the body
  $siLayoutCSS = document.getElementsByTagName('head')[0].appendChild(document.createElement('link'));
  $siLayoutCSS.id = '$siLayoutCSS';
  $siLayoutCSS.rel = 'stylesheet';
  $siLayoutCSS.type = 'text/css';
  $siLayoutCSS.href = $siDomainName + '/search/food/static/sales/creative_base.css';

  // Food.com XML files live on a different server than FoodNetwork.
  $now = new Date();
  $hourTimestamp = $now.getFullYear() + '-' + $now.getMonth() + '-' + $now.getDate() + '-' + $now.getHours();
  if (isMB) {
    $siTemplateXML = $siDomainName + '/search/food/static/sales/' + $siSponsor + '/fcom/template.xml?' + $hourTimestamp;
    _sponsorXML = $siDomainName + '/search/food/static/sales/' + $siSponsor + '/fcom/keywords.xml?' + $hourTimestamp;
    $('.flyout').hide();
  } else {
    $siTemplateXML = $siDomainName + '/search/food/static/sales/' + $siSponsor + '/template.xml?' + $hourTimestamp;
    _sponsorXML = $siDomainName + '/search/food/static/sales/' + $siSponsor + '/keywords.xml?' + $hourTimestamp;
  }

  // include Creative Object
  $siScript = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
  $siScript.type = 'text/javascript';
  $siScript.language = 'javascript';
  $siScript.src = $asiAssetsPath + 'search.integration.mod.v3.js';
}

var $keywordString = '';
function splitKeywords(input){
  var $keywordArray = input.split(' ');
  for(i = 0; i < $keywordArray.length;  i++) {
    $keywordString += $keywordArray[i] + '&keyword=';
  }
  $keywordString = $keywordString.toLowerCase();
}
splitKeywords($siKeyword);
