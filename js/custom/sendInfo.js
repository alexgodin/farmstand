var mixpanel_id = "b47afc95a15870304ff5f44018ce9ce3";

(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
mixpanel.init(mixpanel_id);
// PUT YOUR MIXPANEL ID RIGHT UP THERE :)

$( document ).ready(function() {
	mixpanel.track("page_load");

	$('#myModal').on('shown.bs.modal',function() {
		mixpanel.track("modal_open");
	});

	$('#signup-form').submit(function(event) {
		// prevent default browser behaviour
  		event.preventDefault();

		// Grab all inputs
		var email = $('#email').val()
		var name = $('#name').val()

		if (validateForm(email, name)){
			var distinctId = mixpanel.get_distinct_id()
	        mixpanel.identify(distinctId)
	        // Set user attributes for mixpanel DB
			var response = mixpanel.people.set({
	    	"$email":email,
        "$product-recovery":$('#recovery').is(':checked').toString(),
        "$product-hydrate":$('#hydrate').is(':checked').toString(),
        "$product-boosters":$('#boosters').is(':checked').toString(),
        "$product-dna":$('#dna').is(':checked').toString()
	    });
			fbq('track', 'AddToCart', {
				value: 199,
				currency: 'USD'
			});
			$('#myModal').modal('hide')
			$('#form-success').show();
			// Show alert for three seconds then disappear.
			setTimeout(function(){
				$('#form-success').fadeOut();
				window.location = "https://iter.ly/zzf6q"
			}, 5000)
		} else {
			return false
		}

	});

	function validateForm(email, name){
    // Validate format of email
		if (!validateEmail(email)) {
			if (email.length == 0) {
				showError("Email cannot be blank")
			} else {
				// Enter the text you want to appear in the error box in the form modal
		    	showError(email + " is not a valid email :(")	
			}
		    return false
		} else if (!validateInputs()) {
			return false
		} else {
			return true
		}
	}

	function validateInputs() {
		// Make sure each input isn't blank
		var inputsValid = true
		$.each($('#signup-form input'), function(index, formField) {
            if($(formField).val().trim().length == 0) {
            	showError(capitalizeFirstLetter(formField.id)+ " cannot be blank")
            	inputsValid = false
            }
    	});
		return inputsValid
	}

	function validateEmail(email) {
    	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
	}

	function showError(errorContent){
		$("#form-error-text").text(errorContent);
		$("#form-error").show()
		return false;
	}

	function capitalizeFirstLetter(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}
});