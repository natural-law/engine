module('utils');

test('enum', function () {
    var TestEnum = cc.Enum({
        Width: 1,
        Name: 20,
        UseBest: 0,
        Height: 10,
        Area: 15,
    });

    strictEqual(cc.Enum.isEnum({}), false, '{} is not enum type');
    strictEqual(cc.Enum.isEnum(TestEnum), true, 'TestEnum is enum ');

    deepEqual ( cc.Enum.getList(TestEnum),
               [
                   { name: "UseBest", value: 0 },
                   { name: "Width", value: 1 },
                   { name: "Height", value: 10 },
                   { name: "Area", value: 15 },
                   { name: "Name", value: 20 },
               ],
               "The value must be same" );

    deepEqual ( cc.Enum.getList(cc.Enum({
            '128': 128,
            256: 256,
            512: 512,
            1024: 1024,
            2048: 2048,
            4096: 4096,
        })),
        [
            { name: '128', value: 128 },
            { name: '256', value: 256 },
            { name: '512', value: 512 },
            { name: '1024', value: 1024 },
            { name: '2048', value: 2048 },
            { name: '4096', value: 4096 },
        ],
        "Can define enum name as index value" );
});

test('foreach mutable array', function () {
    var array = [0, 1, 2, 3, 4];
    var iterator = new cc.js.array.MutableForwardIterator(array);

    function removeOperation (index) {
        // can not directly change loop index outside loop scope
        iterator.removeAt(index);
    }

    iterator.i = 0;
    removeOperation(0);
    strictEqual(iterator.i, 0 - 1, 'should decrease the index if remove current item, otherwise iterator will out of sync');

    iterator.i = 1;
    removeOperation(0);
    strictEqual(iterator.i, 1 - 1, 'should decrease the index if remove previous item');

    iterator.i = 0;
    removeOperation(1);
    strictEqual(iterator.i, 0, 'should not decrease the index if remove subsequent item');
});
