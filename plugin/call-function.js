module.exports = (path, {
    isReturnStatement,
    isCallExpression,
    isIdentifier,
    stringLiteral,
    callExpression,
    isMemberExpression,
    memberExpression,
    isThisExpression,
}) => {
    const {node: { left, right, operator }, parent} = path
    if (isReturnStatement(parent) && isCallExpression(left) && isCallExpression(right)){
        if (isMemberExpression(left.callee) && isMemberExpression(right.callee)) {
            const [{ object: X, property: {name: x}}, { object: Y, property: {name: y}}] = [left.callee,right.callee]
            if ((isThisExpression(X) && isIdentifier(Y)) && (x === y && x !== 'valueOf')) return
        }
    }
    path.replaceWith( 
        callExpression(
            memberExpression(
                left,
                stringLiteral(operator),
                true
            ),
            [ right ]
        )
    )
}