"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var json2csv_1 = require("json2csv");
// JSONデータを読み込む
var data = [
    [
        "施設名",
        "区",
        "所在地",
        "開設者名",
        "緯度",
        "経度",
        "電話番号",
        "NO"
    ],
    [
        "三浦歯科技工所",
        "中央区",
        "浜松市中央区鴨江二丁目33-27",
        "三浦　義一",
        "34.702798",
        "137.711019",
        "(053)453-8895",
        1
    ],
    [
        "藤谷歯科技工所",
        "中央区",
        "浜松市中央区上西町33-27",
        "藤谷　明信",
        "34.721114",
        "137.753091",
        "(053)464-6978",
        2
    ],
    [
        "有限会社P.D.K",
        "中央区",
        "浜松市中央区佐鳴台四丁目24-8",
        "有限会社　P.D.K",
        "34.709611",
        "137.700253",
        "(053)448-8882",
        3
    ],
    [
        "アイソ・デンタル・ラボラトリー",
        "中央区",
        "浜松市中央区篠原町20354",
        "相曽　倫則",
        "34.683803",
        "137.659369",
        "(053)447-1496",
        4
    ],
    [
        "桐澤歯科技工所",
        "中央区",
        "浜松市中央区天龍川町134",
        "桐澤　功",
        "34.719879",
        "137.777189",
        "(053)464-0209",
        5
    ],
    [
        "伸和技研",
        "中央区",
        "浜松市中央区新津町577-1",
        "鈴木　裕之",
        "34.722047",
        "137.741458",
        "(053)463-6031",
        6
    ],
    [
        "星野歯科技工室",
        "中央区",
        "浜松市中央区本郷町1366-12",
        "星野　輝男",
        "34.697456",
        "137.760299",
        "(053)461-0965",
        7
    ],
    [
        "中村歯科技工所",
        "中央区",
        "浜松市中央区上浅田一丁目12-15",
        "中村　隆一",
        "34.695028",
        "137.727146",
        "(053)456-7701",
        8
    ],
    [
        "大津歯科技工所",
        "中央区",
        "浜松市中央区野口町432",
        "大津　清史",
        "34.718617",
        "137.739086",
        "(053)463-8608",
        9
    ],
    [
        "アマノデンチャーラボ室",
        "中央区",
        "浜松市中央区花川町85",
        "天野　重直",
        "34.779458",
        "137.693920",
        "(053)438-0378",
        10
    ],
    [
        "浜松デンタルエイト",
        "中央区",
        "浜松市中央区入野町9241-3",
        "大石　昌司",
        "34.700623",
        "137.683674",
        "(053)448-4812",
        11
    ],
    [
        "デンタルファクトリー",
        "中央区",
        "浜松市中央区南浅田二丁目2-21",
        "松永　幸一",
        "34.689262",
        "137.729063",
        "(053)441-8216",
        12
    ],
    [
        "松本歯科技工所",
        "中央区",
        "浜松市中央区西ケ崎町930-1",
        "松本　浩市",
        "34.781003",
        "137.766963",
        "(053)435-4301",
        13
    ],
    [
        "デンタルラボNEGI",
        "中央区",
        "浜松市中央区寺脇町358-2",
        "根木　元彦",
        "34.683816",
        "137.743789",
        "(053)442-1255",
        14
    ],
    [
        "有限会社マキノ・ラボラトリー",
        "中央区",
        "浜松市中央区富塚町200-37",
        "有限会社　マキノ・ラボラトリー",
        "34.720858",
        "137.708560",
        "(053)471-3648",
        15
    ],
    [
        "伊藤デンタルラボ",
        "中央区",
        "浜松市中央区豊町3556-3",
        "伊藤　猛",
        "34.777050",
        "137.806751",
        "(053)433-4303",
        16
    ],
    [
        "フジタデンタルスタジオ",
        "中央区",
        "浜松市中央区神田町199-1　ドミール江西203",
        "藤田　喜章",
        "34.687856",
        "137.724655",
        "(053)442-4771",
        17
    ],
    [
        "セラテックデンタルラボラトリー",
        "中央区",
        "浜松市中央区入野町16109-6",
        "福田　人士",
        "34.702036",
        "137.672280",
        "(053)447-7963",
        18
    ],
    [
        "キャストデンタルスタジオ",
        "中央区",
        "浜松市中央区上島六丁目13-15",
        "北山　俊美",
        "34.740720",
        "137.735371",
        "(053)472-9975",
        19
    ],
    [
        "クローバーデンタルラボラトリー",
        "中央区",
        "浜松市中央区有玉南町1814-1",
        "村松　庄一",
        "34.749745",
        "137.750961",
        "(053)475-9551",
        20
    ],
    [
        "アイラボ",
        "中央区",
        "浜松市中央区三和町862-1",
        "中谷　稔",
        "34.699406",
        "137.770190",
        "(053)462-3699",
        21
    ],
    [
        "デンタルラボラトリー・ハル",
        "中央区",
        "浜松市中央区将監町3-4",
        "春川　富久",
        "34.713971",
        "137.753713",
        "(053)464-4697",
        22
    ],
    [
        "有限会社宏和ラボ",
        "中央区",
        "浜松市中央区葵西五丁目18-20",
        "有限会社　宏和ラボ",
        "34.772643",
        "137.701600",
        "(053)437-7387",
        23
    ],
    [
        "ADL有限会社",
        "中央区",
        "浜松市中央区中央一丁目6-1",
        "ADL有限会社",
        "34.713098",
        "137.736861",
        "(053)454-7677",
        24
    ],
    [
        "ヨネクラデンタルラボ",
        "中央区",
        "浜松市中央区下飯田町490-1",
        "米倉　浩司",
        "34.700515",
        "137.778036",
        "(053)426-3654",
        25
    ],
    [
        "青島ラボ",
        "中央区",
        "浜松市中央区寺島町422",
        "青島　真史",
        "34.699900",
        "137.740164",
        "(053)453-2959",
        26
    ],
    [
        "石原歯科技工所",
        "中央区",
        "浜松市中央区中郡町1858-2",
        "石原　伸英",
        "34.771185",
        "137.783023",
        "(053)434-5690",
        27
    ],
    [
        "宮木歯科技工所",
        "中央区",
        "浜松市中央区呉松町3559-4",
        "宮木　誠",
        "34.768399",
        "137.639623",
        "(053)487-3205",
        28
    ],
    [
        "高台ラボ",
        "中央区",
        "浜松市中央区小豆餅二丁目18-10",
        "近藤　百恵",
        "34.753438",
        "137.725634",
        "(053)439-0740",
        29
    ],
    [
        "APラボ",
        "中央区",
        "浜松市中央区助信町13-16",
        "伊藤　英治",
        "34.721575",
        "137.738839",
        "(053)466-1188",
        30
    ],
    [
        "有限会社宏和ラボ　三方原支社",
        "中央区",
        "浜松市中央区三方原町283-6",
        "有限会社　宏和ラボ",
        "34.774196",
        "137.711238",
        "(053)438-1691",
        31
    ],
    [
        "黒栁歯研",
        "中央区",
        "浜松市中央区米津町1265-2",
        "黒栁　智昭",
        "34.674661",
        "137.714114",
        "(053)442-6402",
        32
    ],
    [
        "オブジェデンタルカンパニー",
        "中央区",
        "浜松市中央区幸一丁目15-26",
        "川合　伸定",
        "34.742653",
        "137.724551",
        "(053)474-4900",
        33
    ],
    [
        "有限会社ノーブル",
        "中央区",
        "浜松市中央区和合町315-1194",
        "有限会社　ノーブル",
        "34.744605",
        "137.711546",
        "(053)473-7201",
        34
    ],
    [
        "遠藤デンタルラボラトリー",
        "中央区",
        "浜松市中央区増楽町697-2",
        "遠藤　誠",
        "34.688092",
        "137.691299",
        "(053)449-1006",
        35
    ],
    [
        "D.C.ラボラトリー",
        "中央区",
        "浜松市中央区渡瀬町809-1",
        "岡本　明",
        "34.705738",
        "137.757199",
        "(053)465-4328",
        36
    ],
    [
        "O.F.Pラボラトリー",
        "中央区",
        "浜松市中央区初生町1215-3",
        "川島　秀一",
        "34.771280",
        "137.719596",
        "(053)439-6803",
        37
    ],
    [
        "野末デンタル工房",
        "中央区",
        "浜松市中央区鹿谷町27-9",
        "野末　和実",
        "34.712759",
        "137.721043",
        "(053)453-7089",
        38
    ],
    [
        "Y'sデンタルスタジオ",
        "中央区",
        "浜松市中央区寺脇町672-1",
        "高須　良輝",
        "34.685324",
        "137.750258",
        "(053)442-4235",
        39
    ],
    [
        "パールデンタル",
        "中央区",
        "浜松市中央区米津町398",
        "松本　欣也",
        "34.670592",
        "137.723150",
        "(053)441-7899",
        40
    ],
    [
        "マルクデンタルラボ",
        "中央区",
        "浜松市中央区笠井新田町844",
        "日高　一郎",
        "34.765023",
        "137.788546",
        "(053)434-7479",
        41
    ],
    [
        "ゲンテック",
        "中央区",
        "浜松市中央区高丘東三丁目38-22",
        "原　由広",
        "34.759712",
        "137.720465",
        "(053)438-8976",
        42
    ],
    [
        "デンタルラボ寺田",
        "中央区",
        "浜松市中央区幸二丁目12-16",
        "寺田　道正",
        "34.739145",
        "137.728949",
        "(053)474-0769",
        43
    ],
    [
        "バイトケア・優",
        "中央区",
        "浜松市中央区上島七丁目17-4",
        "清水　辰也",
        "34.748567",
        "137.741237",
        "(053)412-4050",
        44
    ],
    [
        "大場デンタルラボ",
        "中央区",
        "浜松市中央区中島一丁目4-25",
        "大場　孝治",
        "34.703622",
        "137.745389",
        "(053)463-6548",
        45
    ],
    [
        "マルゼン歯科技工室",
        "中央区",
        "浜松市中央区湖東町1169-57",
        "前地　斉",
        "34.761943",
        "137.671140",
        "(053)486-4284",
        46
    ],
    [
        "K'sデンタルラボラトリー",
        "中央区",
        "浜松市中央区伊左地町3240",
        "野嶋　計人",
        "34.742391",
        "137.670337",
        "(053)485-6765",
        47
    ],
    [
        "マブネデンタルラボ",
        "中央区",
        "浜松市中央区和合町313-3",
        "嶋　晃",
        "34.740158",
        "137.712280",
        "(053)476-5677",
        48
    ],
    [
        "牧野デンタルアート",
        "中央区",
        "浜松市中央区和合町179-15",
        "牧野　公一",
        "34.735934",
        "137.714558",
        "(053)473-0020",
        49
    ],
    [
        "ダックス・デント・ラボ",
        "中央区",
        "浜松市中央区遠州浜四丁目19-3",
        "戸塚　英機",
        "34.653789",
        "137.775616",
        "(053)425-5296",
        50
    ],
    [
        "有限会社足立デンタルラボ",
        "中央区",
        "浜松市中央区三幸町87-11",
        "有限会社　足立デンタル・ラボ",
        "34.797068",
        "137.727361",
        "(053)437-3889",
        51
    ],
    [
        "ウェーブデンチャーラボ",
        "中央区",
        "浜松市中央区立野町333-2",
        "坪井　宏始",
        "34.683395",
        "137.772967",
        "(053)426-1011",
        52
    ],
    [
        "久米デンタルラボラトリー",
        "中央区",
        "浜松市中央区有玉北町1019-2",
        "久米　伸治",
        "34.763771",
        "137.751721",
        "(053)434-6327",
        53
    ],
    [
        "石津歯科技工室",
        "中央区",
        "浜松市中央区佐藤一丁目31-7",
        "石津　直久",
        "34.714020",
        "137.745450",
        "(053)464-7265",
        54
    ],
    [
        "OGI",
        "中央区",
        "浜松市中央区有玉南町988-3",
        "小木　英史",
        "34.753941",
        "137.744281",
        "(053)432-2033",
        55
    ],
    [
        "ステージホワイトデンタルラボラトリー",
        "中央区",
        "浜松市中央区和合町317-81",
        "末久　琢也",
        "34.735417",
        "137.711900",
        "(053)474-3348",
        56
    ],
    [
        "平野歯科技工所",
        "中央区",
        "浜松市中央区高丘東五丁目31-10",
        "メディカルマックス有限会社",
        "34.764431",
        "137.712777",
        "(053)436-7569",
        57
    ],
    [
        "ベルデンタルラボ",
        "中央区",
        "浜松市中央区篠原町20392",
        "鈴木　智昭",
        "34.682728",
        "137.660277",
        "(053)448-7964",
        58
    ],
    [
        "歯科技工俊光",
        "中央区",
        "浜松市中央区若林町2765-2",
        "内田　徳俊",
        "34.693097",
        "137.698923",
        "(053)449-2271",
        59
    ],
    [
        "角川デンタルラボ",
        "中央区",
        "浜松市中央区瓜内町1935-4",
        "角川　利夫",
        "34.683643",
        "137.730696",
        "(053)443-1461",
        60
    ],
    [
        "ODT",
        "中央区",
        "浜松市中央区瓜内町1046",
        "大石　真弘",
        "34.683463",
        "137.735110",
        "(053)442-8132",
        61
    ],
    [
        "アイテック",
        "中央区",
        "浜松市中央区増楽町738-3",
        "井出　成昭",
        "34.687525",
        "137.688874",
        "(053)440-7300",
        62
    ],
    [
        "歯科工房Yamaguchi",
        "中央区",
        "浜松市中央区半田山四丁目17-8",
        "山口　将臣",
        "34.773385",
        "137.745040",
        "(053)435-0735",
        63
    ],
    [
        "和デンタルオフィス",
        "中央区",
        "浜松市中央区平松町2-1",
        "宮野　和也",
        "34.755796",
        "137.633127",
        "(053)487-1991",
        64
    ],
    [
        "野田デンタルラボ",
        "中央区",
        "浜松市中央区渡瀬町106",
        "野田　直志",
        "34.703617",
        "137.762040",
        "(053)461-1853",
        65
    ],
    [
        "佐藤デンタルラボ",
        "中央区",
        "浜松市中央区和合町315-1378",
        "佐藤　陽亮",
        "34.744677",
        "137.710504",
        "(053)472-1397",
        66
    ],
    [
        "鈴元技工",
        "中央区",
        "浜松市中央区寺脇町764-2",
        "鈴木　利元",
        "34.683402",
        "137.750761",
        "(053)441-8994",
        67
    ],
    [
        "ラボラトリー・アイソ",
        "中央区",
        "浜松市中央区和合町315-1025",
        "相曽　和則",
        "34.743691",
        "137.710813",
        "(053)471-3257",
        68
    ],
    [
        "マロニエ工房",
        "中央区",
        "浜松市中央区鴨江三丁目13-6",
        "栩木　知一郎",
        "34.705404",
        "137.709569",
        "(053)458-3444",
        69
    ],
    [
        "Fitデンタルラボラトリー",
        "中央区",
        "浜松市中央区早出町1077-7",
        "春藤　正也",
        "34.730966",
        "137.746949",
        "(053)465-6753",
        70
    ],
    [
        "メイク",
        "中央区",
        "浜松市中央区花川町1788",
        "鳥本　雅之",
        "34.775175",
        "137.689962",
        "(053)439-8998",
        71
    ],
    [
        "コスギ・デンチャー・テクニカ",
        "中央区",
        "浜松市中央区積志町810",
        "小杉　直史",
        "34.767837",
        "137.762355",
        "(053)434-1336",
        72
    ],
    [
        "M's Dental LaboTec",
        "中央区",
        "浜松市中央区小豆餅一丁目34-30",
        "齋藤　昌宏",
        "34.757143",
        "137.725268",
        "(053)439-0776",
        73
    ],
    [
        "佐々木昭技工室",
        "中央区",
        "浜松市中央区米津町1961-1",
        "佐々木　昭",
        "34.676006",
        "137.705934",
        "(053)449-3235",
        74
    ],
    [
        "一瀬デンタルラボラトリー",
        "浜名区",
        "浜松市浜名区上島1946-1",
        "一瀬　文寿",
        "34.843642",
        "137.817568",
        "(053)583-0132",
        75
    ],
    [
        "清光デンタルラボラトリー",
        "浜名区",
        "浜松市浜名区上島1993-2",
        "前川　光広",
        "34.843553",
        "137.818548",
        "(053)583-0960",
        76
    ],
    [
        "太箸歯科技工所",
        "浜名区",
        "浜松市浜名区中瀬2616-2",
        "太箸　孝雄",
        "34.836426",
        "137.810133",
        "(053)588-7026",
        77
    ],
    [
        "ATSUMI　ART　OFFICE　（アツミ・アート・オフィス）",
        "浜名区",
        "浜松市浜名区於呂3136-4",
        "渥美　和也",
        "34.826819",
        "137.801036",
        "(053)588-2089",
        78
    ],
    [
        "デンタルラボむらまつ",
        "浜名区",
        "浜松市浜名区善地535-2",
        "村松　利男",
        "34.789213",
        "137.804300",
        "(053)585-0070",
        79
    ],
    [
        "浜名デンタルラボラトリー",
        "浜名区",
        "浜松市浜名区貴布祢394-15",
        "谷野　聰",
        "34.796541",
        "137.785591",
        "(053)587-2690",
        80
    ],
    [
        "K2デンタル（ケーツーデンタル）",
        "浜名区",
        "浜松市浜名区内野2846",
        "木村　勝彦",
        "34.780266",
        "137.765382",
        "(053)586-9165",
        81
    ],
    [
        "おおたかデンタルデンチャー",
        "浜名区",
        "浜松市浜名区中瀬193-1",
        "大高　一穂",
        "34.814846",
        "137.805672",
        "(053)588-2779",
        82
    ],
    [
        "相羽義研",
        "中央区",
        "浜松市中央区舞阪町長十新田313",
        "相羽　達也",
        "34.680738",
        "137.628155",
        "(053)596-1685",
        83
    ],
    [
        "create T（クリエイト　ティー）",
        "中央区",
        "浜松市中央区雄踏一丁目10-4",
        "石川　哲也",
        "34.696676",
        "137.646228",
        "(053)596-2728",
        84
    ],
    [
        "ナビデンタル",
        "浜名区",
        "浜松市浜名区細江町気賀10038-5",
        "名倉　誠",
        "34.804858",
        "137.623609",
        "(053)527-1815",
        85
    ],
    [
        "浜北歯研",
        "浜名区",
        "浜松市浜名区小松2453-2",
        "竹内　友三",
        "34.788180",
        "137.773109",
        "(053)586-1996",
        86
    ],
    [
        "マイン・デンタル・ラボラトリー",
        "浜名区",
        "浜松市浜名区於呂2988",
        "鈴木　伸治",
        "34.827871",
        "137.798453",
        "(053)588-1573",
        87
    ],
    [
        "エイブルデンタルラボ",
        "浜名区",
        "浜松市浜名区寺島2756-1",
        "三井　知行",
        "34.787793",
        "137.798934",
        "(053)586-5331",
        88
    ],
    [
        "村越歯研",
        "浜名区",
        "浜松市浜名区三ヶ日町三ヶ日696",
        "村越　修",
        "34.805020",
        "137.552747",
        "(090)4163-9885",
        89
    ],
    [
        "モルフォ有床義歯技工所",
        "中央区",
        "浜松市中央区高林四丁目9-25",
        "福澤　謙一",
        "34.731630",
        "137.733449",
        "(053)475-2205",
        90
    ],
    [
        "浜松テクニカルセンター",
        "浜名区",
        "浜松市浜名区染地台一丁目44-20",
        "株式会社　浜松テクニカルセンター",
        "34.781020",
        "137.745540",
        "(053)586-0553",
        91
    ],
    [
        "株式会社　A・インフィニティ",
        "中央区",
        "浜松市中央区馬郡町1186-44",
        "金本　明文",
        "34.687379",
        "137.629138",
        "(053)596-1446",
        92
    ],
    [
        "ウインドブロウデンタルラボラトリー",
        "天竜区",
        "浜松市天竜区二俣町鹿島202-20",
        "鈴木　圭",
        "34.847499",
        "137.807360",
        "(090)7309-9439",
        93
    ],
    [
        "MATT DENTAL",
        "浜名区",
        "浜松市浜名区高畑172",
        "横井　清利",
        "34.791171",
        "137.797798",
        "(053)570-3316",
        94
    ],
    [
        "株式会社　Herbest",
        "中央区",
        "浜松市中央区萩丘二丁目28-16",
        "株式会社　Herbest",
        "34.748394",
        "137.729840",
        "(053)471-2241",
        95
    ],
    [
        "ONDAラボ",
        "中央区",
        "浜松市中央区初生町169-2",
        "恩田　史郎",
        "34.762815",
        "137.734497",
        "(053)437-9910",
        96
    ],
    [
        "タカスデンタル・ラボ",
        "中央区",
        "浜松市中央区遠州浜一丁目24-6",
        "高須　伸",
        "34.657704",
        "137.763590",
        "(053)425-1439",
        97
    ],
    [
        "森下デンタルアート",
        "浜名区",
        "浜松市浜名区西美薗2606-2",
        "森下　直憲",
        "34.807191",
        "137.805830",
        "(053)585-7471",
        98
    ],
    [
        "たばなデンタル・ラボ",
        "天竜区",
        "浜松市天竜区只来825",
        "田花　芳孝",
        "34.888426",
        "137.852179",
        "",
        99
    ],
    [
        "Y.デンタル",
        "浜名区",
        "浜松市浜名区内野台四丁目16-17",
        "山口　照夫",
        "34.790789",
        "137.752292",
        "(053)587-8884",
        100
    ],
    [
        "有限会社ADL",
        "中央区",
        "浜松市中央区丸塚町80-6",
        "有限会社　ADL",
        "34.727886",
        "137.764384",
        "(053)460-7835",
        101
    ],
    [
        "和田精密歯研株式会社　浜松ラボ",
        "中央区",
        "浜松市中央区和田町215-5",
        "和田精密歯研　株式会社",
        "34.715546",
        "137.775953",
        "(053)468-2012",
        102
    ],
    [
        "スズキデンタル工房",
        "中央区",
        "浜松市中央区雄踏一丁目23-5",
        "鈴木　基史",
        "34.695659",
        "137.643134",
        "(053)592-3823",
        103
    ],
    [
        "株式会社プラハットデンタル",
        "浜名区",
        "浜松市浜名区新原4220-5",
        "株式会社　プラハットデンタル",
        "34.808564",
        "137.766568",
        "(053)585-5355",
        104
    ],
    [
        "トライデント",
        "中央区",
        "浜松市中央区本郷町1367-1",
        "辻　賢吾",
        "34.696126",
        "137.760602",
        "(053)461-8005",
        105
    ],
    [
        "メルデンタルアート",
        "中央区",
        "浜松市中央区初生町430-1",
        "野澤　章弘",
        "34.765634",
        "137.733470",
        "(053)523-7652",
        106
    ],
    [
        "松本デンタルラボラトリー",
        "中央区",
        "浜松市中央区三幸町489-3",
        "松本　達郎",
        "34.805639",
        "137.720505",
        "(090)3930-6928",
        107
    ],
    [
        "崎山ラボ",
        "浜名区",
        "浜松市浜名区新原3428-2",
        "崎山　泰司",
        "34.810961",
        "137.780169",
        "(053)585-4303",
        108
    ],
    [
        "Dental Art EXE",
        "中央区",
        "浜松市中央区飯田町300-1",
        "株式会社　HORIZON",
        "34.709483",
        "137.778736",
        "(053)545-7378",
        109
    ],
    [
        "Chelsea lab",
        "中央区",
        "浜松市中央区上西町2-10",
        "鵜塚　幸弘",
        "34.724878",
        "137.751596",
        "(053)401-6903",
        110
    ],
    [
        "（有）城北デンタルラボラトリー",
        "中央区",
        "浜松市中央区入野町4902-8　シャトレかみむら1F中央",
        "有限会社　城北デンタルラボラトリー",
        "34.700477",
        "137.694231",
        "(053)449-4447",
        111
    ],
    [
        "株式会社オルソ",
        "中央区",
        "浜松市中央区広沢二丁目53-2",
        "株式会社　オルソ",
        "34.715630",
        "137.713854",
        "(053)413-4182",
        112
    ],
    [
        "Dentory（デントリー）",
        "中央区",
        "浜松市中央区蜆塚三丁目16-22-23",
        "鳥居　俊宏",
        "34.716775",
        "137.707857",
        "(053)523-8506",
        113
    ],
    [
        "サザンオールスターズ　デンタルラボラトリー　成島技工室",
        "中央区",
        "浜松市中央区有玉南町2461",
        "成島　孝弥",
        "34.748189",
        "137.744114",
        "(053)523-7309",
        114
    ],
    [
        "Glass.Y　Dental",
        "中央区",
        "浜松市中央区早出町1248-28",
        "横地　正和",
        "34.726239",
        "137.751771",
        "(090)1986-7842",
        115
    ],
    [
        "Pro.Fit40",
        "中央区",
        "浜松市中央区上西町28-9",
        "鈴木　邦浩",
        "34.721767",
        "137.754977",
        "(053)589-3855",
        116
    ],
    [
        "IOL",
        "浜名区",
        "浜松市浜名区横須賀619",
        "井上　謙太郎",
        "34.789987",
        "137.790316",
        "(053)586-2863",
        117
    ],
    [
        "株式会社コットンテール浜松事業所",
        "中央区",
        "浜松市中央区和地町773",
        "株式会社　コットンテール",
        "34.762201",
        "137.648645",
        "(053)486-0313",
        118
    ],
    [
        "デンタルラボ・フデ",
        "浜名区",
        "浜松市浜名区内野1200",
        "筆　永治",
        "34.780563",
        "137.752378",
        "(053)401-8127",
        119
    ],
    [
        "BSデンタル",
        "中央区",
        "浜松市中央区高塚町896-1",
        "大石　知稔",
        "34.691411",
        "137.682730",
        "(053)447-4193",
        120
    ],
    [
        "大川医科歯科研究所　浜松ミリングセンター（CAD/CAMセンター）",
        "中央区",
        "浜松市中央区早出町221-7",
        "大川　哲",
        "34.738215",
        "137.752137",
        "(053)465-5551",
        121
    ],
    [
        "佐野入れ歯工房",
        "中央区",
        "浜松市中央区富塚町919-307",
        "佐野　進",
        "34.726124",
        "137.710498",
        "(053)474-2281",
        122
    ],
    [
        "まきの歯科工房",
        "中央区",
        "浜松市中央区上西町34-2",
        "牧野　雅彦",
        "34.721053",
        "137.753480",
        "(090)5457-7695",
        123
    ],
    [
        "MASAデンタルラボ",
        "中央区",
        "浜松市中央区東伊場一丁目32-24",
        "鈴木　正広",
        "34.701193",
        "137.712566",
        "(053)458-8140",
        124
    ],
    [
        "グロースデンタルラボラトリー",
        "中央区",
        "浜松市中央区初生町650-1",
        "小林　一則",
        "34.764564",
        "137.719971",
        "(090)8499-8459",
        125
    ],
    [
        "シーピーデンタルラボラトリー",
        "中央区",
        "浜松市中央区有玉西町2197-10",
        "伊藤　登",
        "34.752316",
        "137.736240",
        "(053)474-3793",
        126
    ],
    [
        "K・Gプロダクト",
        "中央区",
        "浜松市中央区高塚町111-1",
        "五明　景司",
        "34.690347",
        "137.685874",
        "(090)1988-9372",
        127
    ],
    [
        "有限会社　坪井商事",
        "浜名区",
        "浜松市浜名区細江町気賀3258-4",
        "有限会社　坪井商事",
        "34.788197",
        "137.644986",
        "(053)522-4382",
        128
    ],
    [
        "加藤ラボ",
        "中央区",
        "浜松市中央区天龍川町125-1",
        "加藤　公教",
        "34.719551",
        "137.776836",
        "(090)5109-7411",
        129
    ],
    [
        "有限会社　FDラボ室",
        "中央区",
        "浜松市中央区布橋二丁目3-52",
        "有限会社　FDラボ室",
        "34.719122",
        "137.717279",
        "(053)570-8689",
        130
    ],
    [
        "UCHIYAMA CERAMIC",
        "中央区",
        "浜松市中央区大平台三丁目16-15　B-Ⅱ",
        "内山　強",
        "34.711749",
        "137.679704",
        "(053)571-7659",
        131
    ],
    [
        "ベルデ",
        "中央区",
        "浜松市中央区佐鳴台四丁目36-12",
        "加藤　勝基",
        "34.711978",
        "137.700680",
        "(053)415-0418",
        132
    ],
    [
        "セブンデンタルラボラトリー",
        "中央区",
        "浜松市中央区早出町1246-5",
        "永井　町子",
        "34.726886",
        "137.751238",
        "(090)9122-2997",
        133
    ],
    [
        "アルミックデンタル",
        "中央区",
        "浜松市中央区中央野町910-3",
        "木村　英雄",
        "34.708637",
        "137.740333",
        "(053)422-2667",
        134
    ],
    [
        "内山デンタルファクトリー",
        "中央区",
        "浜松市中央区半田山四丁目38-16",
        "内山　智隆",
        "34.778019",
        "137.742844",
        "(053)433-5227",
        135
    ],
    [
        "カワイデンタルラボラトリー",
        "中央区",
        "浜松市中央区常光町231-2",
        "川合　悦夫",
        "34.754641",
        "137.802870",
        "(053)435-1511",
        136
    ],
    [
        "ナカゼ歯科技工所",
        "浜名区",
        "浜松市浜名区新原3596-3",
        "医療法人社団ナカゼ歯科",
        "34.811395",
        "137.779158",
        "(053)585-2181",
        137
    ],
    [
        "ブライトデンタルラボラトリー",
        "中央区",
        "浜松市中央区若林町1214",
        "医療法人社団英仁会",
        "34.688689",
        "137.699973",
        "(053)448-1194",
        138
    ],
    [
        "田中デンタルラボ",
        "中央区",
        "浜松市中央区富塚町2478-1",
        "田中　成和",
        "34.722677",
        "137.695988",
        "(053)474-2923",
        139
    ],
    [
        "ヤマシタデンタルラボ",
        "浜名区",
        "浜松市浜名区引佐町井伊谷1349-6",
        "山下　浩二",
        "34.827033",
        "137.666790",
        "(053)542-3000",
        140
    ],
    [
        "EISHI DENTURE DESIGN",
        "中央区",
        "浜松市中央区佐鳴台四丁目21-26",
        "医療法人社団英仁会",
        "34.711294",
        "137.702775",
        "(090)1620-0148",
        141
    ],
    [
        "市川技士工房",
        "中央区",
        "浜松市中央区上島六丁目31-4",
        "市川　郁雄",
        "34.746072",
        "137.738775",
        "(053)543-4201",
        142
    ],
    [
        "M's Dental Laboratory",
        "中央区",
        "浜松市中央区大平台三丁目28-30",
        "医療法人社団マキタ歯科",
        "34.713191",
        "137.678316",
        "(053)482-0888",
        143
    ],
    [
        "Dent　Works",
        "中央区",
        "浜松市中央区若林町2602-3",
        "山下　英夫",
        "34.695774",
        "137.700825",
        "(053)453-7298",
        144
    ],
    [
        "むらい歯科口腔外科クリニック技工所",
        "中央区",
        "浜松市中央区佐鳴台六丁目10-15",
        "医療法人社団H・I・L・C",
        "34.704344",
        "137.691845",
        "(053)445-3353",
        145
    ],
    [
        "SUZUKI DENTAL LAB",
        "中央区",
        "浜松市中央区篠ケ瀬町462-2",
        "鈴木　貴博",
        "34.731094",
        "137.775983",
        "(080)3005-6236",
        146
    ],
    [
        "ユニオン・サポート",
        "中央区",
        "浜松市中央区松小池町160",
        "平野　明弘",
        "34.737203",
        "137.792489",
        "(053)422-8686",
        147
    ],
    [
        "HAO DENTAL BASE",
        "中央区",
        "浜松市中央区富塚町1574-21",
        "大谷　広祐",
        "34.732732",
        "137.712831",
        "(090)5620-4314",
        148
    ],
    [
        "清光デンタルラボラトリー新原事業所",
        "浜名区",
        "浜松市浜名区新原4152-1",
        "前川　光広",
        "34.809944",
        "137.771174",
        "(090)3253-5128",
        149
    ],
    [
        "あいみるデンタルラボ",
        "中央区",
        "浜松市中央区志都呂一丁目4-16",
        "株式会社モントレゾール",
        "34.699793",
        "137.663820",
        "(053)415-0777",
        150
    ]
];
// 必要なフィールドを抽出し、電話番号の形式を変換する
var formattedData = data.slice(1).map(function (row) { return ({
    施設名: row[0],
    緯度: row[4],
    経度: row[5],
    住所: row[2],
    電話番号: row[6].replace(/\(/g, '').replace(/\)/g, '-')
}); });
// CSV形式で出力する
var csv = (0, json2csv_1.parse)(formattedData, { fields: ["施設名", "緯度", "経度", "住所", "電話番号"] });
fs.writeFileSync(path.join(__dirname, 'hamamatsu.csv'), csv);
console.log('CSVファイルが生成されました。');
