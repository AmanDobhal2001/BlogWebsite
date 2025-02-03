import React, { useEffect, useRef } from 'react';

function TranslateWidget() {
  const translateElementRef = useRef(null);

  useEffect(() => {
    // Load Google Translate script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    // Initialize Google Translate once the script is loaded
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
      
      const googleDiv = translateElementRef.current.querySelector('.skiptranslate');
      const googleDivChild = googleDiv.querySelector('div');
      
      googleDivChild?.nextElementSibling?.remove();
      
      googleDiv
        .childNodes
        .forEach(child => {
          if (child.nodeType === 3 && child.nodeValue.trim() !== '') {
            child.remove();
          }
        });
    };
    
    // Cleanup: Remove the script if component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="google_translate_element" ref={translateElementRef}></div>;
}

export default TranslateWidget;
