# Circular Gauge

'react-native-circular-gauge is a simple circular gauge library.

This library supports 3 types of gauges.

1. Scale
2. Percent
3. Duration

## Installation

```sh
npm install --save react-native-circular-gauge
```

or

```sh
yar add react-native-circular-gauge
```

## Example

> Not yet implemented.

## Usage

> Not yet implemented.

## Properties

### Common

| Name | Description   | Type   | Required | Default |
| ---- | ------------- | ------ | :------: | :-----: |
| size | size of gauge | Number |   ⭕️    |         |

#### Scale Options

| Name       | Description                                                   | Type    | Required |   Default   |
| ---------- | ------------------------------------------------------------- | ------- | :------: | :---------: |
| total      | maximum value of scale                                        | Number  |    ❌    |     100     |
| unit       | unit of scale                                                 | Number  |    ❌    |      5      |
| clockwise  | clockwise or not                                              | Boolean |    ❌    |    true     |
| color      | gauge ruler color                                             | String  |    ❌    |   #7F8487   |
| width      | gauge ruler thickness                                         | Number  |    ❌    | 10% of size |
| showLine   | If false, you won't be able to see the scale lines.           | Boolean |    ❌    |    true     |
| lineColor  | scale line color                                              | String  |    ❌    |   #7F8487   |
| lineWidth  | scale line width                                              | Number  |    ❌    |      2      |
| lineLength | scale line length                                             | Number  |    ❌    |     10      |
| showText   | If false, you won't be able to see the scale line value text. | Boolean |    ❌    |    false    |
| textSize   | size of scale text                                            | Number  |    ❌    |     10      |
| textColor  | color of scale text                                           | String  |    ❌    |   #191919   |

### Amount

| Name            | Description                              | Type                     | Required | Default |
| --------------- | ---------------------------------------- | ------------------------ | :------: | :-----: |
| amount          | amount of gauge                          | Number                   |   ⭕️    |         |
| pointerColor    | color of pointer                         | String                   |    ❌    | #FFA500 |
| scaleGaugeColor | color of filled gauge                    | String                   |    ❌    | #FFE5B4 |
| onChangeAmount  | Called when the amount value is changed. | Function(amount: number) |    ❌    |  null   |

### Percent

> Not yet implemented.

### Duration

> Not yet implemented.

## Dependencies

- **react-natie-reanimated(v2)**
- **react-native-gesture-handler**
- react-native-redash
- react-native-svg

## Reference

YouTuber [William Candillon](https://www.youtube.com/c/wcandillon)'s "can-it-be-done-in-react-native" lecture was very helpful.

- youtube: [Apple Bedtime - “Can it be done in React Native?”](https://www.youtube.com/watch?v=Ek1RAFAFqdA)
- github: [can-it-be-done-in-react-native(Bedtime)](https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Bedtime)

## License

[MIT](https://choosealicense.com/licenses/mit/)
