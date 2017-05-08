module.exports = function(source) {

  var value = source.replace(/\s+class=/g, ' className=');

  value = value.replace(/(\<(area|base|br|col|embed|frame|hr|img|input|isindex|keygen|link|meta|param|source|track|wbr)(\s*|\/|([^>]+(\=\>)[^>]+)+|[^\>]+))\>/g, function(tagAll, tag) {
    return tagAll.replace(/\s*\/?\>$/, ' />';
  });

  value = value.replace(/<label([^\>]+)for=/g, function(label, otherAttr) {
    return '<label' + otherAttr + 'htmlFor=';
  });

  value = value.replace(/\<[a-z]+[^\>]+style=((\'|\")([^\"]+)\2)/g, function(style, styleStr, s2, styleStrCon) {
    if(/\+/.test(styleStr)) {
      return styleStr;
    }
    var styleObj = '{{';
    var styleArr = styleStrCon.split(/\s*\;\s*/);
    styleArr.forEach(function(styleItem, i) {
      if(!styleItem) {
        return;
      }
      var styleNV = styleItem.split(/\s*\:\s*/);
      if(i > 0) {
        styleObj += ', ';
      }
      var styleAttr = styleNV[0].replace(/\-([a-z])/g, function(a, b) {
        return b.toUpperCase();
      });
      styleObj += styleAttr + ': ' + '\'' + styleNV[1] + '\''
    })
    styleObj += '}}';
    return style.replace(styleStr, styleObj)
  });

  var correctAttr = 'acceptCharset accessKey allowFullScreen allowTransparency autoComplete autoPlay cellPadding cellSpacing charSet classID colSpan contentEditable contextMenu crossOrigin dateTime encType formAction formEncType formMethod formNoValidate formTarget frameBorder hrefLang httpEquiv marginHeight marginWidth minLength maxLength mediaGroup noValidate radioGroup readOnly rowSpan spellCheck srcDoc srcSet tabIndex useMap';
  value = value.replace(/\s+(acceptcharset|accesskey|allowfullscreen|allowtransparency|autocomplete|autoplay|cellpadding|cellspacing|charset|classid|colspan|contenteditable|contextmenu|crossorigin|datetime|enctype|formaction|formenctype|formmethod|formnovalidate|formtarget|frameborder|hreflang|httpequiv|marginheight|marginwidth|minlength|maxlength|mediagroup|novalidate|radiogroup|readonly|rowspan|spellcheck|srcdoc|srcset|tabindex|usemap)\=/g, function(attrAll, attr) {
    return ' ' + correctAttr.match(new RegExp(attr, 'i'))[0] + '=';
  });

  value = value.replace(/(checked)\=(\'|\")\1\2/g, function(checked) {
    return 'defaultChecked';
  });

  value = value.replace(/(selected)\=(\'|\")\1\2/g, function(checked) {
    return 'defaultValue';
  });

  return value;
};