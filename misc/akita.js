"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var csv = require("csv-parser");
var csv_writer_1 = require("csv-writer");
var inputFilePath = 'akita-input.csv';
var outputFilePath = 'akita.csv';
var apiKey = process.env.GOOGLE_API_KEY;
var apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
var facilities = [];
fs.createReadStream(inputFilePath)
    .pipe(csv())
    .on('data', function (row) {
    facilities.push({
        管轄: row['管轄'],
        管理番号: row['管理番号'],
        施設名: row['施設名'],
        開設者名: row['開設者名'],
        所在地: row['所在地'],
    });
})
    .on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
    var outputFacilities, _i, facilities_1, facility, address, response, data, location_1, i, result, csvWriter;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                outputFacilities = [];
                _i = 0, facilities_1 = facilities;
                _b.label = 1;
            case 1:
                if (!(_i < facilities_1.length)) return [3 /*break*/, 5];
                facility = facilities_1[_i];
                address = "\u79CB\u7530\u770C".concat(facility.所在地);
                return [4 /*yield*/, fetch("".concat(apiUrl, "?key=").concat(apiKey, "&address=").concat(encodeURIComponent("".concat(address))))];
            case 2:
                response = _b.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _b.sent();
                location_1 = (_a = data.results[0]) === null || _a === void 0 ? void 0 : _a.geometry.location;
                for (i = 1; i < data.results.length; i++) {
                    console.log("0 ".concat(facility.施設名, " (").concat(address, "), ").concat(location_1.lat, ", ").concat(location_1.lng, ",").concat(data.results[0].geometry.location_type));
                    result = data.results[i];
                    console.log("".concat(i, " ").concat(facility.施設名, " (").concat(address, "), ").concat(result.geometry.location.lat, ", ").concat(result.geometry.location.lng, ", ").concat(result.geometry.location_type));
                    if (result.geometry.location_type === 'ROOFTOP' || result.geometry.location_type === 'APPROXIMATE') {
                        location_1 = result.geometry.location;
                    }
                }
                outputFacilities.push({
                    管轄: facility.管轄,
                    管理番号: facility.管理番号,
                    名称: facility.施設名,
                    緯度: location_1 ? location_1.lat : null,
                    経度: location_1 ? location_1.lng : null,
                    所在地: address,
                    電話番号: ''
                });
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 1];
            case 5:
                csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
                    path: outputFilePath,
                    header: [
                        { id: '管轄', title: '管轄' },
                        { id: '管理番号', title: '管理番号' },
                        { id: '名称', title: '名称' },
                        { id: '緯度', title: '緯度' },
                        { id: '経度', title: '経度' },
                        { id: '所在地', title: '所在地' },
                        { id: '電話番号', title: '電話番号' }
                    ]
                });
                return [4 /*yield*/, csvWriter.writeRecords(outputFacilities)];
            case 6:
                _b.sent();
                console.log('akita.csv has been written successfully.');
                return [2 /*return*/];
        }
    });
}); });
// npx tsc akita.ts && node akita.js | tee akita.log
