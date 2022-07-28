# Circular Gauge

3 types Circular Slider Component for React Native.

Support type

- **Amount:** amount of the total amount
- **Percent:** percentages of total amount
- **Duration:** start and end in total amount

<br/>

## Installation

```sh
npm install --save @zaradev/react-native-circular-slider
```

or

```sh
yarn add @zaradev/react-native-circular-slider
```

<br/>

## Example

![Screen Shot 2022-07-28 at 04 25 07 AM](https://user-images.githubusercontent.com/74804564/181355451-b3da66b3-9f6d-4366-88cb-80b96b59d76b.png)

### Anatomy

The name refers to [Material UI](https://material.io/components/sliders#anatomy).

![Screen Shot 2022-07-28 at 04 19 56 AM](https://user-images.githubusercontent.com/74804564/181354645-4cbdaaf4-0d63-4caa-92f9-f4c384395538.png)

<br/>

## Usage

```jsx
const [size, setSize] = useState(200);
const [amount, setAmount] = useState(25);
const [percents, setPercents] = useState([40, 30, 20, 10]);
const [duration, setDuration] = useState({
  start: 10,
  end: 50,
});
const [clockwise, setClockwise] = useState(true);

return (
  <>
    <AmountSlider
      size={size}
      amount={amount}
      onChange={setAmount}
      clockwise={clockwise}
    />
    <PercentSlider
      percents={percents}
      size={size}
      onChange={setPercents}
      clockwise={clockwise}
    />
    <DurationSlider
      size={size}
      duration={duration}
      onChange={setDuration}
      clockwise={clockwise}
    />
  </>
);
```

<br/>

## Properties

### Amount

| Name             | Description                             | Type                     | Required | Default |
| ---------------- | --------------------------------------- | ------------------------ | :------: | :-----: |
| amount           |                                         | number                   |    ✅    |         |
| thumbColor       | color of thumb                          | string                   |    ❌    | #FFA500 |
| filledGaugeColor | color of filled gauge                   | string                   |    ❌    | #FFE5B4 |
| onChange         | called when the amount value is changed | function(amount: number) |    ❌    |         |

### Percent

| Name             | Description                                | Type                         | Required | Default |
| ---------------- | ------------------------------------------ | ---------------------------- | :------: | :-----: |
| percents         |                                            | number[]                     |    ✅    |         |
| thumbColor       | color of thumb                             | string[]                     |    ❌    | #FFA500 |
| filledGaugeColor | color of filled gauge                      | string[]                     |    ❌    | #FFE5B4 |
| onChange         | Called when the percents value is changed. | function(percents: number[]) |    ❌    |         |

### Duration

| Name             | Description                                | Type                                              | Required | Default |
| ---------------- | ------------------------------------------ | ------------------------------------------------- | :------: | :-----: |
| duration         |                                            | {start: number; end: number;}                     |    ✅    |         |
| thumbColor       | color of thumb                             | string                                            |    ❌    | #FFA500 |
| filledGaugeColor | color of filled gauge                      | string                                            |    ❌    | #FFE5B4 |
| onChange         | Called when the duration value is changed. | function(duration: {start: number; end: number;}) |    ❌    |         |

### Common

| Name      | Description        | Type    | Required | Default |
| --------- | ------------------ | ------- | :------: | :-----: |
| size      | size of slider     | number  |    ✅    |         |
| clockwise | rotation direction | boolean |    ❌    |  true   |

#### Track Options

| Name  | Description    | Type   | Required |   Default   |
| ----- | -------------- | ------ | :------: | :---------: |
| width | width of track | number |    ❌    | 10% of size |
| color | color of track | string |    ❌    |   #7F8487   |

#### Tick Mark Options

| Name      | Description                           | Type    | Required |      Default      | Amount | Percent | Duration |
| --------- | ------------------------------------- | ------- | :------: | :---------------: | :----: | :-----: | :------: |
| show      | If you need to render Tick Mark       | Boolean |    ❌    |       false       |   ✅   |   ✅    |    ✅    |
| total     | maximum value of slider               | Number  |    ❌    |        100        |   ✅   |   ❌    |    ✅    |
| unit      | Tick Mark division unit               | Number  |    ❌    |         5         |   ✅   |   ❌    |    ✅    |
| color     | color of Tick Mark                    | String  |    ❌    |      #7F8487      |   ✅   |   ✅    |    ✅    |
| length    | legnth of Tick Mark                   | Number  |    ❌    |        10         |   ✅   |   ✅    |    ✅    |
| thickness | thickness of Tick Mark                | Boolean |    ❌    |         2         |   ✅   |   ✅    |    ✅    |
| showText  | If you need to render Tick Mark units | String  |    ❌    | show option value |   ✅   |   ✅    |    ✅    |
| textSize  | size of text                          | Number  |    ❌    |        10         |   ✅   |   ✅    |    ✅    |
| textColor | color of text                         | Number  |    ❌    |      #191919      |   ✅   |   ✅    |    ✅    |

<br/>

## Dependencies

- **react-natie-reanimated(v2)**
- **react-native-gesture-handler**
- react-native-redash
- react-native-svg

<br/>

## Reference

YouTuber [William Candillon](https://www.youtube.com/c/wcandillon)'s "can-it-be-done-in-react-native" lecture was very helpful.

- youtube: [Apple Bedtime - “Can it be done in React Native?”](https://www.youtube.com/watch?v=Ek1RAFAFqdA)
- github: [can-it-be-done-in-react-native(Bedtime)](https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Bedtime)

<br/>

## License

[MIT](https://choosealicense.com/licenses/mit/)
