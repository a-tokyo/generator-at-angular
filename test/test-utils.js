/*
 * debuging mode flag, set to true to enable dir logging and debug features
 */
exports.debugMode = false;
/*
 * logs something if the boolean value is true
 */
exports.logIf = function(valueToLog, canLog){
  if(canLog){
    console.log(valueToLog);
  }
};
