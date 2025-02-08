class StringChain:
    @classmethod
    def INPUT_TYPES(cls) -> dict:
        return {
            'optional': {
                'previous': ('STRING', {'forceInput': True, 'default': '', 'multiline': True}),
                'string': ('STRING', {'default': '', 'multiline': True})
            }
        }
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'combine'
    CATEGORY = 'utils'
    def combine(self, previous: str = '', string: str = '') -> tuple[str]:
        return (f'{previous}, {string}',) if previous and string else (previous or string,)
