/** @format */

declare interface ISvgrComponent
    extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
    const content: ISvgrComponent;
    export default content;
}
