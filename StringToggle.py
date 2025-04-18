from .common import FlexibleOptionalInputType, AnyType

optional = FlexibleOptionalInputType(AnyType('STRING'))
optional.update({
    'previous': ('STRING', {'forceInput': True, 'default': '', 'multiline': True})
})

class StringToggle:
    @classmethod
    def INPUT_TYPES(cls) -> dict:
        return {
            'required': { 'separator': ('STRING', {'default': ', '}) },
            'optional': optional
        }
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'join'
    CATEGORY = 'utils'
    def join(self, separator: str, previous: str = '', **kwargs) -> tuple[str]:
        arguments = {}
        for (argtype, unique), value in [(k.split('_'),v) for k,v in kwargs.items() if '_' in k]:
            arguments.setdefault(argtype, {})[unique] = value
        strings = ([previous] if previous else []) + [text for unique, text in arguments['text'].items() if arguments['append'][unique]]
        return (separator.join(strings),)
