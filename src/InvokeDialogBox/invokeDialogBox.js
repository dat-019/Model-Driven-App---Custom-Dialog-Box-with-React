var dialogBox = dialogBox || {};

dialogBox.ContactRibbon = (function(){
    
    function openDialog(formContext) {
        
        //pseudo-unique identified to be used 
        var sessionId = new Date().getTime() + "";

        var data = {
            text: formContext.data.entity.getPrimaryAttributeValue(),
            date: formContext.getAttribute('createdon').getValue(),
            sessionId: sessionId
        };

        var dialogParameters = {
            pageType: "webresource",//required
            webresourceName: "ab_/ABCustomDialog/index.html",//Html Webresource that will be shown
            data: JSON.stringify(data)
        };

        var navigationOptions = {
            target: 2,//use 1 if you want to open page inline or 2 to open it as dialog
            width: 400,
            height: 300,
            position: 1
        };

        //var alertStrings = { confirmButtonLabel: 'Yes', text: 'This is an alert.' };
        //var alertOptions = { height: 120, width: 260 };
        
        Xrm.Navigation.navigateTo(dialogParameters, navigationOptions).then(
            function () {
                // perform operations on alert dialog close

                var callbackDataString = sessionStorage.getItem(sessionId);
                //callbackData is blank when "Cancel" button is clicked
                if (!callbackDataString) {
                    return;
                }
                var callbackDataObject = JSON.parse(callbackDataString);

                console.log(callbackDataObject);

                //Add your processing logic here
            },
            function (error) {
                console.log(error.message);
                // handle error conditions
                Xrm.Navigation.openErrorDialog(e);
            }
        );
    }

    return{
        OpenDialog: openDialog
    }


})();
