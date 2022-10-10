echo ''
mkdir src/server/.logs
>>src/server/.logs/error.log
>>src/server/.logs/debug.log
>>src/server/.logs/info.log
echo '*****************************************'
echo '* THERE MUST BE 3 FILES (debug.log | info.log | error.log) ON src/server/.logs'
echo '* Here is the content of src/server/.logs'
ls src/server/.logs
echo '* IF IT''S EMPTY, PLEASE CREATE IT'
echo '*****************************************'
echo ''