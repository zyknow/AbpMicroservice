var fs = require('fs');
var xml2js = require('xml2js'); // 用于解析XML

fs.readFile('./common.props', (err, data) => {
    if (err) throw err;

    var parser = new xml2js.Parser();
    parser.parseString(data, function (err, result) {
        if (err) throw err;

        // 从XML的Project/PropertyGroup/Version节点下获取版本号
        var version = result.Project.PropertyGroup[0].Version[0];

        // 然后读取并更新package.json文件
        fs.readFile('./package.json', (err, data) => {
            if (err) throw err;

            var packageJsonObj = JSON.parse(data);
            packageJsonObj.version = version;
            packageJsonObj = JSON.stringify(packageJsonObj, null, 2); // 格式化JSON输出

            fs.writeFile('./package.json', packageJsonObj, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        });
    });
});
