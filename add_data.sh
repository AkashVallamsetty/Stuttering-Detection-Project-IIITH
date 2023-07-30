#!/bin/bash

# add English questions
http POST localhost:5000/question question="What is your name?" language="English" bound=4
http POST localhost:5000/question question="Where do you live?" language="English" bound=4
http POST localhost:5000/question question="Who are there in your house?" language="English" bound=6
http POST localhost:5000/question question="What are you studying/working?" language="English" bound=5
http POST localhost:5000/question question="What are your hobbies?" language="English" bound=5

# add Kannada questions
http POST localhost:5000/question question="ನಿಮ್ಮ ಹೆಸರು ಏನು ?" language="Kannada" bound=10
http POST localhost:5000/question question="ನೀವು ಎಲ್ಲಿ ವಾಸ ಮಾಡುತ್ತಿದ್ದೀರಾ ?" language="Kannada" bound=17
http POST localhost:5000/question question="ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಯಾರೆಲ್ಲ ಇದ್ದಾರೆ ?" language="Kannada" bound=22
http POST localhost:5000/question question="ನೀವು ಏನು ಓದುತ್ತಿದ್ದೀರಾ/ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೀರಾ?" language="Kannada" bound=18
http POST localhost:5000/question question="ನಿಮ್ಮ ಹವ್ಯಾಸಗಳು ಏನು?" language="Kannada" bound=15

# add English passages
http POST localhost:5000/passage passage="London is the capital city of England and the United Kingdom. It is one of the biggest cities in the world. People from different parts of the world come to see this city. Besides, in our country, places like York, Liverpool, and Manchester are visited by people. Silk is produced in this country." language="English" bound=54
http POST localhost:5000/passage passage="The River Thames is a river that flows through southern England. It is the longest river entirely in England and the second longest in the United Kingdom. There are 45 locks on the river. It has also been used for major sporting events." language="English" bound=39

# add Kannada passages
http POST localhost:5000/passage passage="ಬೆಂಗಳೂರು ನಮ್ಮ ರಾಜ್ಯದ ಒಂದು ದೊಡ್ಡ ಊರು.ಈ ಊರನ್ನು ನಮ್ಮ ರಾಜ್ಯದ \"ಬೊಂಬಾಯಿ\" ಎನ್ನುವರು.ಇಂಡಿಯಾದ ದೊಡ್ಡ ನಗರಗಳಲ್ಲಿ ಇದು ಒಂದು.ಈ ಊರನ್ನು ನೋಡಲು ಜನರು ಬೇರೆ ಬೇರೆ ಊರುಗಳಿಂದ ಬರುವರು.ಇದಲ್ಲದೆ ನಮ್ಮ ರಾಜ್ಯದಲ್ಲಿರುವ ಬೇಲೂರು, ಜೋಗ್, ನಂದಿ ಇವುಗಳನ್ನು ನೋಡಲು ಜನರು ಬರುವರು.ಈ ನಾಡಿನಲ್ಲಿ ರೇಷ್ಮೆಯನ್ನು ಬೆಳೆಯುವರು." language="Kannada" bound=115
http POST localhost:5000/passage passage="ಕೃಷ್ಣಾ ನದಿಯು ಸಹ್ಯಾದ್ರಿ ಪರ್ವತಗಳ್ಲಲಿ ಮಹಾಬಲೇಶ್ವರದ ಹತ್ತಿರ ಹುಟ್ಟುತ್ತದೆ.ಈ ಪ್ರದೇಶವು ರಮಣೀಯವಾದ ಸ್ಥಾನ. ಇದು ಮಹಾರಾಷ್ಟ್ರ,ಕರ್ನಾಟಕ ಮತ್ತು ಆಂಧ್ರಪ್ರದೇಶಗಳಲ್ಲಿ ಹರಿದು ಬಂಗಾಳ ಕೊಲ್ಲಿಯನ್ನು ಸೇರುತ್ತದೆ. ಇದಕ್ಕೆ ಉಪನದಿಗಳು ಹಲವು ಕೊಯಿನಾ, ತುಂಗಭದ್ರಾ, ಘಟಪ್ರಭಾ,ಭೀಮ, ಮಲಪ್ರಭಾ - ಅವುಗಳಲ್ಲಿ ಕೆಲವು. ಕೊಯಿನಾ ನದಿಗೆ ಅಣೆಕಟ್ಟನ್ನು ಕಟ್ಟಿ ವಿದ್ಯುತನ್ನು ಉತ್ಪಾದನೆ ಮಾಡುತ್ತಾರೆ" language="Kannada" bound=137