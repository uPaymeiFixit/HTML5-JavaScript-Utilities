Function.prototype.MeasureTime = function(n,args) {
	var s = Date.now();
	for (var i = 0; i < n; i++) {
		this.apply(this,args);
	}
	var t = Date.now() - s;
	return t + "ms" + " ( "+t/n+"ms/call )";
};