#!/usr/bin/expect
set timeout 360
yo at-angular
expect "Your application name (myATApp)" { send "\r" }
