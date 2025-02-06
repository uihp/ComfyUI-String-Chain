from .StringChain import StringChain
from .StringConcat import StringConcat
from .StringToggle import StringToggle

WEB_DIRECTORY = "./js"

NODE_CLASS_MAPPINGS = {
    'String Chain': StringChain,
    'String Concat': StringConcat,
    'String Toggle': StringToggle,
    'String Toggle (Multiline)': StringToggle
}

__all__ = ['NODE_CLASS_MAPPINGS', 'WEB_DIRECTORY']
