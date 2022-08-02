cd ios
arch -x86_64 pod install
echo -e "POD${PURPLE} WAS${PINK} INSTALLED{$PINK}"
npm start --reset-cache
react-native run-ios

