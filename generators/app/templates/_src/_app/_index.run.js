function runBlock($log) {
	'ngInject';
<%if (options.dreidev) { %>
  //Console greeting sentences.
  console.log("%cCareful, this is a tool intended for developers.", "color: #1985A3; font-size: x-large; font-weight: bold;");
  console.log("%cPasting commands here may cause your data to be stolen by attackers.", "color: black; font-size: medium;");
  console.log("%cIf you're a fellow web devloper, have your fun. -DREIDEV", "color: black; font-size: small; font-style: italic;");
<%}%>
	$log.debug('Hello from run block!');
}

export default runBlock;
