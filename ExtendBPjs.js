bp.log.info('This is me :-)');

//block the event eset in the given scope
function block(eset) {
	return {
		in:  function(blockScope) {
			//save previous bp
			var _bp = bp;
			bp = {
					//new sync function
					sync : function(rwb){
                        //there are no other events we need to block
						if (rwb.block == null){
							rwb.block = eset;
						}
						//there are other events we need to block,
						//concatenate them all together
						else{
							rwb.block = [rwb.block, eset];
						}
						//call to original sync
						_bp.sync(rwb);
					},
					log: _bp.log,
					Event: function (e) {return _bp.Event(e)}
				};
            blockScope();
			//restore previous bp
			bp = _bp;
			}
		}	
};

//special Exception for breakupon function
function bpException() {}

//wait for the event eset in the given scope,
//when eset is triggered, break execution
function breakupon(eset) {
	return {
		in:  function(waitForScope) {
            //save previous bp
            var _bp = bp;
			bp = {
			        //new sync function
					sync : function(rwb){
                        //there are no other events we need to wait for
						if (rwb.waitFor == null){
							rwb.waitFor = eset;
						}
						else{
                            //there are other events we need to wait for,
                            //concatenate them all together
							rwb.waitFor = [rwb.waitFor, eset];
						}

						//call to original sync and save the last event that happen
                        e = _bp.sync(rwb);

						//eset is single event
						if (eset.length == undefined){
						    eset = [eset];
                        }
                        //check if the last event that happen is part of eset
						if (eset.some(evt => evt.name == e.name)){
						    throw new bpException();
                        }
					},
                    log: _bp.log,
					Event: function (e) {return _bp.Event(e)}
				};
			return {
			    catch : function (breakFunction) {
                    try{
                        waitForScope();
                    }
                    catch(e if e instanceof bpException){
                        breakFunction();
                        //restore previous bp
                        bp = _bp;
                        return;
                    }
                }
            }
		}
	}
};
