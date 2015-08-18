<?php
header("Content-type: text/plain"); // be explicit to avoid accidental XSS
system("/usr/bin/git fetch 2>&1");
echo "\nDone.\n";
