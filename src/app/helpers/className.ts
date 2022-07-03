/**
 * classNames : Join conditionally classNames together
 * ? classNames('foo', 'bar') // => 'foo bar'
 * ? classNames('foo', { bar: true }) // => 'foo bar'
 * ? classNames({ 'foo-bar': true }) // => 'foo-bar'
 * ? classNames({ 'foo-bar': false }) // => ''
 * ? classNames({ foo: true }, { bar: true }) // => 'foo bar'
 * ? classNames({ foo: true, bar: true }) // => 'foo bar'
 * ? classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'
 * ? 
 */
type Vclass = {[key: string]: boolean | null | undefined } | string | number | false | null | undefined
type Vclasses = Vclass[]

export const classNames = (...classes: Vclasses): string =>
    classes.map(
        classGroup => 
            !classGroup ? '' :
            typeof classGroup === 'string' ? classGroup :
            typeof classGroup === 'number' ? `${classGroup}` :
            Object.entries(classes)
                .filter((entry) => entry[1])
                .map((entry) => entry[0])
                .join(' ')
        )
        .filter(entry => entry !== '')
        .join(' ')

/**
 * Alias of className
 */
export const vClass = classNames
