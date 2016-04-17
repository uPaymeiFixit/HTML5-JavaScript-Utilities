/**
 * Clone Object r0531121759
 * @author Josh Gibbs - uPaymeiFixit@gmail.com
 * @author Eric Muyser - http://stackoverflow.com/questions/4816099/chrome-sendrequest-error-typeerror-converting-circular-structure-to-json#answer-9653082
 *
 * Description:
 *   Returns clone of an object, even if the object is circular
 *
 * Usage:
 *   var ClonedObject = ExampleObject.clone()
 */

Object.prototype.clone = function() {
	var th = this;
	return JSON.parse(JSON.stringify(this,
		(function() {
			return (function() {
				var i = 0;

				return function(key,value) {
					if (i !== 0 && typeof(th) === "object" && typeof(value) == "object" && th == value)
						return "[Circular]";

					if (i >= 29)
						return "[Unknown]";
					++i;

					return value;

				};
			})(th);
		}())
	));
};