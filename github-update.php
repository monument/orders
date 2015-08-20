<?php
// be explicit to avoid accidental XSS
header("Content-type: text/plain");
system("/usr/bin/git pull origin master 2>&1");
echo "\nDone.\n";
