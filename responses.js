exports.getResponses = function(){
    var responseMap = [
        {pattern:/<regexrofindapattern/, response:{file: "someFile.xml"}},
        {pattern:/<findItemsByKeywordsRequest/, response:{file: "searchRS.xml"}}
];
return responseMap;
};
