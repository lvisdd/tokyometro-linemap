var line_milt2odpt = { "2号線日比谷線":"日比谷線",
                       "3号線銀座線":"銀座線",
                       "4号線丸ノ内線":"丸ノ内線",
                       "4号線丸ノ内線分岐線":"丸ノ内線（分岐線）",
                       "5号線東西線":"東西線",
                       "7号線南北線":"南北線",
                       "8号線有楽町線":"有楽町線",
                       "9号線千代田線":"千代田線",
                       "11号線半蔵門線":"半蔵門線",
                       "13号線副都心線":"副都心線",
                     };

var station_milt2odpt = { "市ヶ谷":"市ケ谷",
                          "霞ヶ関":"霞ケ関",
                          "雑司が谷":"雑司が谷",
                          "南阿佐ヶ谷":"南阿佐ケ谷",
                          "西ヶ原":"西ケ原",
                          "押上":"押上〈スカイツリー前〉",
                          "明治神宮前":"明治神宮前〈原宿〉",
                          "四谷":"四ツ谷",
                          "麹町":"麴町",
                        };

var station_url2wiki = { "http://ja.wikipedia.org/wiki/入谷駅":"http://ja.wikipedia.org/wiki/入谷駅_(東京都)",
                         "http://ja.wikipedia.org/wiki/霞ケ関駅":"http://ja.wikipedia.org/wiki/霞ケ関駅_(東京都)",
                         "http://ja.wikipedia.org/wiki/八丁堀駅":"http://ja.wikipedia.org/wiki/八丁堀駅_(東京都)",
                         "http://ja.wikipedia.org/wiki/末広町駅":"http://ja.wikipedia.org/wiki/末広町駅_(東京都)",
                         "http://ja.wikipedia.org/wiki/稲荷町駅":"http://ja.wikipedia.org/wiki/稲荷町駅_(東京都)",
                         "http://ja.wikipedia.org/wiki/田原町駅":"http://ja.wikipedia.org/wiki/田原町駅_(東京都)",
                         "http://ja.wikipedia.org/wiki/日本橋駅":"http://ja.wikipedia.org/wiki/日本橋駅_(東京都)",
                         "http://ja.wikipedia.org/wiki/京橋駅":"http://ja.wikipedia.org/wiki/京橋駅_(東京都)",
                         "http://ja.wikipedia.org/wiki/神田駅":"http://ja.wikipedia.org/wiki/神田駅_(東京都)",
                         "http://ja.wikipedia.org/wiki/大手町駅":"http://ja.wikipedia.org/wiki/大手町駅_(東京都)",
                         "http://ja.wikipedia.org/wiki/中野駅":"http://ja.wikipedia.org/wiki/中野駅_(東京都)",
                         "http://ja.wikipedia.org/wiki/落合駅":"http://ja.wikipedia.org/wiki/落合駅_(東京都)",
                         "http://ja.wikipedia.org/wiki/浦安駅":"http://ja.wikipedia.org/wiki/浦安駅_(千葉県)",
                         "http://ja.wikipedia.org/wiki/平和台駅":"http://ja.wikipedia.org/wiki/平和台駅_(東京都)",
                         "http://ja.wikipedia.org/wiki/新富町駅":"http://ja.wikipedia.org/wiki/新富町駅_(東京都)",
                         "http://ja.wikipedia.org/wiki/麴町駅":"http://ja.wikipedia.org/w/index.php?title=麴町駅&redirect=yes",
                         "http://ja.wikipedia.org/wiki/赤坂駅":"http://ja.wikipedia.org/wiki/赤坂駅_(東京都)",
                         "http://ja.wikipedia.org/wiki/明治神宮前〈原宿〉駅":"http://ja.wikipedia.org/w/index.php?title=明治神宮前〈原宿〉駅&redirect=yes",
                         "http://ja.wikipedia.org/wiki/押上〈スカイツリー前〉駅":"http://ja.wikipedia.org/wiki/押上駅",
                         "http://ja.wikipedia.org/wiki/住吉駅":"http://ja.wikipedia.org/wiki/住吉駅_(東京都)",
                       }


var line_colors = { "日比谷線":"#9caeb7",
                    "銀座線":"#f39700",
                    "丸ノ内線":"#e60012",
                    "丸ノ内線（分岐線）":"#e60012",
                    "東西線":"#00a7db",
                    "南北線":"#00ada9",
                    "有楽町線":"#d7c447",
                    "千代田線":"#009944",
                    "半蔵門線":"#9b7cb6",
                    "副都心線":"#bb641d",
                  };

var line_icons = { "日比谷線":"/icon/linemark/H.svg",
                   "銀座線":"/icon/linemark/G.svg",
                   "丸ノ内線":"/icon/linemark/M.svg",
                   "丸ノ内線（分岐線）":"/icon/linemark/M.svg",
                   "東西線":"/icon/linemark/T.svg",
                   "南北線":"/icon/linemark/N.svg",
                   "有楽町線":"/icon/linemark/Y.svg",
                   "千代田線":"/icon/linemark/C.svg",
                   "半蔵門線":"/icon/linemark/Z.svg",
                   "副都心線":"/icon/linemark/F.svg",
                 };

var station_icons = { "日比谷線-中目黒":"/icon/station_number_icon/H/station_icon_h-01.svg",
                      "日比谷線-恵比寿":"/icon/station_number_icon/H/station_icon_h-02.svg",
                      "日比谷線-広尾":"/icon/station_number_icon/H/station_icon_h-03.svg",
                      "日比谷線-六本木":"/icon/station_number_icon/H/station_icon_h-04.svg",
                      "日比谷線-神谷町":"/icon/station_number_icon/H/station_icon_h-05.svg",
                      "日比谷線-霞ケ関":"/icon/station_number_icon/H/station_icon_h-06.svg",
                      "日比谷線-日比谷":"/icon/station_number_icon/H/station_icon_h-07.svg",
                      "日比谷線-銀座":"/icon/station_number_icon/H/station_icon_h-08.svg",
                      "日比谷線-東銀座":"/icon/station_number_icon/H/station_icon_h-09.svg",
                      "日比谷線-築地":"/icon/station_number_icon/H/station_icon_h-10.svg",
                      "日比谷線-八丁堀":"/icon/station_number_icon/H/station_icon_h-11.svg",
                      "日比谷線-茅場町":"/icon/station_number_icon/H/station_icon_h-12.svg",
                      "日比谷線-人形町":"/icon/station_number_icon/H/station_icon_h-13.svg",
                      "日比谷線-小伝馬町":"/icon/station_number_icon/H/station_icon_h-14.svg",
                      "日比谷線-秋葉原":"/icon/station_number_icon/H/station_icon_h-15.svg",
                      "日比谷線-仲御徒町":"/icon/station_number_icon/H/station_icon_h-16.svg",
                      "日比谷線-上野":"/icon/station_number_icon/H/station_icon_h-17.svg",
                      "日比谷線-入谷":"/icon/station_number_icon/H/station_icon_h-18.svg",
                      "日比谷線-三ノ輪":"/icon/station_number_icon/H/station_icon_h-19.svg",
                      "日比谷線-南千住":"/icon/station_number_icon/H/station_icon_h-20.svg",
                      "日比谷線-北千住":"/icon/station_number_icon/H/station_icon_h-21.svg",
                      "銀座線-渋谷":"/icon/station_number_icon/G/station_icon_g-01.svg",
                      "銀座線-表参道":"/icon/station_number_icon/G/station_icon_g-02.svg",
                      "銀座線-外苑前":"/icon/station_number_icon/G/station_icon_g-03.svg",
                      "銀座線-青山一丁目":"/icon/station_number_icon/G/station_icon_g-04.svg",
                      "銀座線-赤坂見附":"/icon/station_number_icon/G/station_icon_g-05.svg",
                      "銀座線-溜池山王":"/icon/station_number_icon/G/station_icon_g-06.svg",
                      "銀座線-虎ノ門":"/icon/station_number_icon/G/station_icon_g-07.svg",
                      "銀座線-新橋":"/icon/station_number_icon/G/station_icon_g-08.svg",
                      "銀座線-銀座":"/icon/station_number_icon/G/station_icon_g-09.svg",
                      "銀座線-京橋":"/icon/station_number_icon/G/station_icon_g-10.svg",
                      "銀座線-日本橋":"/icon/station_number_icon/G/station_icon_g-11.svg",
                      "銀座線-三越前":"/icon/station_number_icon/G/station_icon_g-12.svg",
                      "銀座線-神田":"/icon/station_number_icon/G/station_icon_g-13.svg",
                      "銀座線-末広町":"/icon/station_number_icon/G/station_icon_g-14.svg",
                      "銀座線-上野広小路":"/icon/station_number_icon/G/station_icon_g-15.svg",
                      "銀座線-上野":"/icon/station_number_icon/G/station_icon_g-16.svg",
                      "銀座線-稲荷町":"/icon/station_number_icon/G/station_icon_g-17.svg",
                      "銀座線-田原町":"/icon/station_number_icon/G/station_icon_g-18.svg",
                      "銀座線-浅草":"/icon/station_number_icon/G/station_icon_g-19.svg",
                      "丸ノ内線-荻窪":"/icon/station_number_icon/M/station_icon_m-01.svg",
                      "丸ノ内線-南阿佐ケ谷":"/icon/station_number_icon/M/station_icon_m-02.svg",
                      "丸ノ内線-新高円寺":"/icon/station_number_icon/M/station_icon_m-03.svg",
                      "丸ノ内線-東高円寺":"/icon/station_number_icon/M/station_icon_m-04.svg",
                      "丸ノ内線-新中野":"/icon/station_number_icon/M/station_icon_m-05.svg",
                      "丸ノ内線-中野坂上":"/icon/station_number_icon/M/station_icon_m-06.svg",
                      "丸ノ内線-西新宿":"/icon/station_number_icon/M/station_icon_m-07.svg",
                      "丸ノ内線-新宿":"/icon/station_number_icon/M/station_icon_m-08.svg",
                      "丸ノ内線-新宿三丁目":"/icon/station_number_icon/M/station_icon_m-09.svg",
                      "丸ノ内線-新宿御苑前":"/icon/station_number_icon/M/station_icon_m-10.svg",
                      "丸ノ内線-四谷三丁目":"/icon/station_number_icon/M/station_icon_m-11.svg",
                      "丸ノ内線-四ツ谷":"/icon/station_number_icon/M/station_icon_m-12.svg",
                      "丸ノ内線-赤坂見附":"/icon/station_number_icon/M/station_icon_m-13.svg",
                      "丸ノ内線-国会議事堂前":"/icon/station_number_icon/M/station_icon_m-14.svg",
                      "丸ノ内線-霞ケ関":"/icon/station_number_icon/M/station_icon_m-15.svg",
                      "丸ノ内線-銀座":"/icon/station_number_icon/M/station_icon_m-16.svg",
                      "丸ノ内線-東京":"/icon/station_number_icon/M/station_icon_m-17.svg",
                      "丸ノ内線-大手町":"/icon/station_number_icon/M/station_icon_m-18.svg",
                      "丸ノ内線-淡路町":"/icon/station_number_icon/M/station_icon_m-19.svg",
                      "丸ノ内線-御茶ノ水":"/icon/station_number_icon/M/station_icon_m-20.svg",
                      "丸ノ内線-本郷三丁目":"/icon/station_number_icon/M/station_icon_m-21.svg",
                      "丸ノ内線-後楽園":"/icon/station_number_icon/M/station_icon_m-22.svg",
                      "丸ノ内線-茗荷谷":"/icon/station_number_icon/M/station_icon_m-23.svg",
                      "丸ノ内線-新大塚":"/icon/station_number_icon/M/station_icon_m-24.svg",
                      "丸ノ内線-池袋":"/icon/station_number_icon/M/station_icon_m-25.svg",
                      "丸ノ内線（分岐線）-方南町":"/icon/station_number_icon/M/station_icon_mm-03.svg",
                      "丸ノ内線（分岐線）-中野富士見町":"/icon/station_number_icon/M/station_icon_mm-04.svg",
                      "丸ノ内線（分岐線）-中野新橋":"/icon/station_number_icon/M/station_icon_mm-05.svg",
                      "東西線-中野":"/icon/station_number_icon/T/station_icon_t-01.svg",
                      "東西線-落合":"/icon/station_number_icon/T/station_icon_t-02.svg",
                      "東西線-高田馬場":"/icon/station_number_icon/T/station_icon_t-03.svg",
                      "東西線-早稲田":"/icon/station_number_icon/T/station_icon_t-04.svg",
                      "東西線-神楽坂":"/icon/station_number_icon/T/station_icon_t-05.svg",
                      "東西線-飯田橋":"/icon/station_number_icon/T/station_icon_t-06.svg",
                      "東西線-九段下":"/icon/station_number_icon/T/station_icon_t-07.svg",
                      "東西線-竹橋":"/icon/station_number_icon/T/station_icon_t-08.svg",
                      "東西線-大手町":"/icon/station_number_icon/T/station_icon_t-09.svg",
                      "東西線-日本橋":"/icon/station_number_icon/T/station_icon_t-10.svg",
                      "東西線-茅場町":"/icon/station_number_icon/T/station_icon_t-11.svg",
                      "東西線-門前仲町":"/icon/station_number_icon/T/station_icon_t-12.svg",
                      "東西線-木場":"/icon/station_number_icon/T/station_icon_t-13.svg",
                      "東西線-東陽町":"/icon/station_number_icon/T/station_icon_t-14.svg",
                      "東西線-南砂町":"/icon/station_number_icon/T/station_icon_t-15.svg",
                      "東西線-西葛西":"/icon/station_number_icon/T/station_icon_t-16.svg",
                      "東西線-葛西":"/icon/station_number_icon/T/station_icon_t-17.svg",
                      "東西線-浦安":"/icon/station_number_icon/T/station_icon_t-18.svg",
                      "東西線-南行徳":"/icon/station_number_icon/T/station_icon_t-19.svg",
                      "東西線-行徳":"/icon/station_number_icon/T/station_icon_t-20.svg",
                      "東西線-妙典":"/icon/station_number_icon/T/station_icon_t-21.svg",
                      "東西線-原木中山":"/icon/station_number_icon/T/station_icon_t-22.svg",
                      "東西線-西船橋":"/icon/station_number_icon/T/station_icon_t-23.svg",
                      "南北線-目黒":"/icon/station_number_icon/N/station_icon_n-01.svg",
                      "南北線-白金台":"/icon/station_number_icon/N/station_icon_n-02.svg",
                      "南北線-白金高輪":"/icon/station_number_icon/N/station_icon_n-03.svg",
                      "南北線-麻布十番":"/icon/station_number_icon/N/station_icon_n-04.svg",
                      "南北線-六本木一丁目":"/icon/station_number_icon/N/station_icon_n-05.svg",
                      "南北線-溜池山王":"/icon/station_number_icon/N/station_icon_n-06.svg",
                      "南北線-永田町":"/icon/station_number_icon/N/station_icon_n-07.svg",
                      "南北線-四ツ谷":"/icon/station_number_icon/N/station_icon_n-08.svg",
                      "南北線-市ケ谷":"/icon/station_number_icon/N/station_icon_n-09.svg",
                      "南北線-飯田橋":"/icon/station_number_icon/N/station_icon_n-10.svg",
                      "南北線-後楽園":"/icon/station_number_icon/N/station_icon_n-11.svg",
                      "南北線-東大前":"/icon/station_number_icon/N/station_icon_n-12.svg",
                      "南北線-本駒込":"/icon/station_number_icon/N/station_icon_n-13.svg",
                      "南北線-駒込":"/icon/station_number_icon/N/station_icon_n-14.svg",
                      "南北線-西ケ原":"/icon/station_number_icon/N/station_icon_n-15.svg",
                      "南北線-王子":"/icon/station_number_icon/N/station_icon_n-16.svg",
                      "南北線-王子神谷":"/icon/station_number_icon/N/station_icon_n-17.svg",
                      "南北線-志茂":"/icon/station_number_icon/N/station_icon_n-18.svg",
                      "南北線-赤羽岩淵":"/icon/station_number_icon/N/station_icon_n-19.svg",
                      "有楽町線-和光市":"/icon/station_number_icon/Y/station_icon_y-01.svg",
                      "有楽町線-地下鉄成増":"/icon/station_number_icon/Y/station_icon_y-02.svg",
                      "有楽町線-地下鉄赤塚":"/icon/station_number_icon/Y/station_icon_y-03.svg",
                      "有楽町線-平和台":"/icon/station_number_icon/Y/station_icon_y-04.svg",
                      "有楽町線-氷川台":"/icon/station_number_icon/Y/station_icon_y-05.svg",
                      "有楽町線-小竹向原":"/icon/station_number_icon/Y/station_icon_y-06.svg",
                      "有楽町線-千川":"/icon/station_number_icon/Y/station_icon_y-07.svg",
                      "有楽町線-要町":"/icon/station_number_icon/Y/station_icon_y-08.svg",
                      "有楽町線-池袋":"/icon/station_number_icon/Y/station_icon_y-09.svg",
                      "有楽町線-東池袋":"/icon/station_number_icon/Y/station_icon_y-10.svg",
                      "有楽町線-護国寺":"/icon/station_number_icon/Y/station_icon_y-11.svg",
                      "有楽町線-江戸川橋":"/icon/station_number_icon/Y/station_icon_y-12.svg",
                      "有楽町線-飯田橋":"/icon/station_number_icon/Y/station_icon_y-13.svg",
                      "有楽町線-市ケ谷":"/icon/station_number_icon/Y/station_icon_y-14.svg",
                      "有楽町線-麹町":"/icon/station_number_icon/Y/station_icon_y-15.svg",
                      "有楽町線-永田町":"/icon/station_number_icon/Y/station_icon_y-16.svg",
                      "有楽町線-桜田門":"/icon/station_number_icon/Y/station_icon_y-17.svg",
                      "有楽町線-有楽町":"/icon/station_number_icon/Y/station_icon_y-18.svg",
                      "有楽町線-銀座一丁目":"/icon/station_number_icon/Y/station_icon_y-19.svg",
                      "有楽町線-新富町":"/icon/station_number_icon/Y/station_icon_y-20.svg",
                      "有楽町線-月島":"/icon/station_number_icon/Y/station_icon_y-21.svg",
                      "有楽町線-豊洲":"/icon/station_number_icon/Y/station_icon_y-22.svg",
                      "有楽町線-辰巳":"/icon/station_number_icon/Y/station_icon_y-23.svg",
                      "有楽町線-新木場":"/icon/station_number_icon/Y/station_icon_y-24.svg",
                      "千代田線-代々木上原":"/icon/station_number_icon/C/station_icon_c-01.svg",
                      "千代田線-代々木公園":"/icon/station_number_icon/C/station_icon_c-02.svg",
                      "千代田線-明治神宮前〈原宿〉":"/icon/station_number_icon/C/station_icon_c-03.svg",
                      "千代田線-表参道":"/icon/station_number_icon/C/station_icon_c-04.svg",
                      "千代田線-乃木坂":"/icon/station_number_icon/C/station_icon_c-05.svg",
                      "千代田線-赤坂":"/icon/station_number_icon/C/station_icon_c-06.svg",
                      "千代田線-国会議事堂前":"/icon/station_number_icon/C/station_icon_c-07.svg",
                      "千代田線-霞ケ関":"/icon/station_number_icon/C/station_icon_c-08.svg",
                      "千代田線-日比谷":"/icon/station_number_icon/C/station_icon_c-09.svg",
                      "千代田線-二重橋前":"/icon/station_number_icon/C/station_icon_c-10.svg",
                      "千代田線-大手町":"/icon/station_number_icon/C/station_icon_c-11.svg",
                      "千代田線-新御茶ノ水":"/icon/station_number_icon/C/station_icon_c-12.svg",
                      "千代田線-湯島":"/icon/station_number_icon/C/station_icon_c-13.svg",
                      "千代田線-根津":"/icon/station_number_icon/C/station_icon_c-14.svg",
                      "千代田線-千駄木":"/icon/station_number_icon/C/station_icon_c-15.svg",
                      "千代田線-西日暮里":"/icon/station_number_icon/C/station_icon_c-16.svg",
                      "千代田線-町屋":"/icon/station_number_icon/C/station_icon_c-17.svg",
                      "千代田線-北千住":"/icon/station_number_icon/C/station_icon_c-18.svg",
                      "千代田線-綾瀬":"/icon/station_number_icon/C/station_icon_c-19.svg",
                      "千代田線-北綾瀬":"/icon/station_number_icon/C/station_icon_c-20.svg",
                      "半蔵門線-渋谷":"/icon/station_number_icon/Z/station_icon_z-01.svg",
                      "半蔵門線-表参道":"/icon/station_number_icon/Z/station_icon_z-02.svg",
                      "半蔵門線-青山一丁目":"/icon/station_number_icon/Z/station_icon_z-03.svg",
                      "半蔵門線-永田町":"/icon/station_number_icon/Z/station_icon_z-04.svg",
                      "半蔵門線-半蔵門":"/icon/station_number_icon/Z/station_icon_z-05.svg",
                      "半蔵門線-九段下":"/icon/station_number_icon/Z/station_icon_z-06.svg",
                      "半蔵門線-神保町":"/icon/station_number_icon/Z/station_icon_z-07.svg",
                      "半蔵門線-大手町":"/icon/station_number_icon/Z/station_icon_z-08.svg",
                      "半蔵門線-三越前":"/icon/station_number_icon/Z/station_icon_z-09.svg",
                      "半蔵門線-水天宮前":"/icon/station_number_icon/Z/station_icon_z-10.svg",
                      "半蔵門線-清澄白河":"/icon/station_number_icon/Z/station_icon_z-11.svg",
                      "半蔵門線-住吉":"/icon/station_number_icon/Z/station_icon_z-12.svg",
                      "半蔵門線-錦糸町":"/icon/station_number_icon/Z/station_icon_z-13.svg",
                      "半蔵門線-押上〈スカイツリー前〉":"/icon/station_number_icon/Z/station_icon_z-14.svg",
                      "副都心線-和光市":"/icon/station_number_icon/F/station_icon_f-01.svg",
                      "副都心線-地下鉄成増":"/icon/station_number_icon/F/station_icon_f-02.svg",
                      "副都心線-地下鉄赤塚":"/icon/station_number_icon/F/station_icon_f-03.svg",
                      "副都心線-平和台":"/icon/station_number_icon/F/station_icon_f-04.svg",
                      "副都心線-氷川台":"/icon/station_number_icon/F/station_icon_f-05.svg",
                      "副都心線-小竹向原":"/icon/station_number_icon/F/station_icon_f-06.svg",
                      "副都心線-千川":"/icon/station_number_icon/F/station_icon_f-07.svg",
                      "副都心線-要町":"/icon/station_number_icon/F/station_icon_f-08.svg",
                      "副都心線-池袋":"/icon/station_number_icon/F/station_icon_f-09.svg",
                      "副都心線-雑司が谷":"/icon/station_number_icon/F/station_icon_f-10.svg",
                      "副都心線-西早稲田":"/icon/station_number_icon/F/station_icon_f-11.svg",
                      "副都心線-東新宿":"/icon/station_number_icon/F/station_icon_f-12.svg",
                      "副都心線-新宿三丁目":"/icon/station_number_icon/F/station_icon_f-13.svg",
                      "副都心線-北参道":"/icon/station_number_icon/F/station_icon_f-14.svg",
                      "副都心線-明治神宮前〈原宿〉":"/icon/station_number_icon/F/station_icon_f-15.svg",
                      "副都心線-渋谷":"/icon/station_number_icon/F/station_icon_f-16.svg",
                 };

function getlinecolor(name){
  if(line_colors.hasOwnProperty(name)){
    return line_colors[name];
  } else{
    return "#000";
  }
}

function getlinename(name){
  if(line_milt2odpt.hasOwnProperty(name)){
    return line_milt2odpt[name];
  } else{
    return name;
  }
}

function getstationname(name){
  if(station_milt2odpt.hasOwnProperty(name)){
    return station_milt2odpt[name];
  } else{
    return name;
  }
}

function getlineurl(name){
  url = "http://ja.wikipedia.org/wiki/" + "東京メトロ" + name;
  return url;
}

function getstationurl(name){
  url = "http://ja.wikipedia.org/wiki/" + name + "駅";
  if(station_url2wiki.hasOwnProperty(url)){
    return station_url2wiki[url];
  } else{
    return url;
  }
}

function getlineicon(name){
  if(line_icons.hasOwnProperty(name)){
    return line_icons[name];
  } else{
    return "";
  }
}

function getstationicon(line_name,station_name){
  var name = line_name + "-" + station_name;
  if(station_icons.hasOwnProperty(name)){
    return station_icons[name];
  } else{
    return "";
  }
}